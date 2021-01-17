import { useRouter } from 'next/router';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';
import { RichText } from 'prismic-reactjs';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import ErrorPage from 'next/error';

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?._meta?.uid) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div className="container mx-auto">
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article className="py-6">
              <NextSeo
                title={post.title[0].text}
                titleTemplate="%s | MatíasVerdier.com"
                description={post.excerpt}
                canonical={`https://matiasverdier.com/posts/${post._meta.uid}`}
                openGraph={{
                  site_name: 'MatíasVerdier.com',
                  locale: 'es_UY',
                  url: `https://matiasverdier.com/posts/${post._meta.uid}`,
                  title: post.title[0].text,
                  description: post.excerpt,
                  type: 'article',
                  article: {
                    publishedTime: post.date,
                    authors: [post.author.name],
                  },
                  images: post.coverimage
                    ? [
                        {
                          url: post.coverimage.url,
                          width: 800,
                          height: 600,
                          alt: 'Article cover image',
                        },
                      ]
                    : [],
                }}
                twitter={{
                  handle: `@matiasvj`,
                  site: '@matiasvj',
                  cardType: 'summary_large_image',
                }}
              />

              <ArticleJsonLd
                url={`https://matiasverdier.com/posts/${post._meta.uid}`}
                title={post.title[0].text}
                images={post.coverimage ? [post.coverimage.url] : []}
                datePublished={post.date}
                authorName={[post.author.name]}
                publisherName="Matías Verdier"
                publisherLogo={`https://matiasverdier.com/favicon.png`}
                description={post.excerpt}
              />

              <div className="max-w-2xl mx-auto prose prose-lg">
                <h1 className="pt-4">{post.title[0].text}</h1>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="mb-6 pl-1 text-gray-500 uppercase">
                  {format(parseISO(post.date), `dd 'de' MMMM, yyyy`, {
                    locale: es,
                  })}
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="prose prose-lg prose-indigo">
                  <RichText render={post.content} />
                </div>
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await getPostAndMorePosts(params.slug, previewData);

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? [],
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ node }) => `/posts/${node._meta.uid}`) || [],
    fallback: true,
  };
}
