import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';
import { RichText } from 'prismic-reactjs';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

export default function Post({ post, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?._meta?.uid) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div preview={`${preview}`}>
      <div className="container mx-auto">
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article className="py-6">
              <Head>
                <title>{post.title[0].text} | MatíasVerdier.com</title>
                {post.coverimage ? (
                  <meta property="og:image" content={post.coverimage.url} />
                ) : null}
              </Head>

              <div className="max-w-2xl mx-auto prose prose-lg">
                <h1 className="pt-4">{post.title[0].text}</h1>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="mb-6 pl-1 text-lg text-gray-500">
                  {format(parseISO(post.date), 'd/LL/yyyy')}
                </div>
              </div>

              {post.coverimage ? (
                <div className="max-w-2xl mx-auto">
                  <Image
                    src={post.coverimage.url}
                    alt={post.coverimage.alt}
                    width={post.coverimage.dimensions.width}
                    height={post.coverimage.dimensions.height}
                  />
                </div>
              ) : null}

              <div className="max-w-2xl mx-auto">
                <div className="prose prose-lg">
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
