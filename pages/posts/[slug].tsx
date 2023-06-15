import Giscus from '@giscus/react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import Image from 'next/image';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import client from '../../tina/__generated__/client';

export default function Post({ data, query, variables }) {
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  return (
    <div>
      <div className="container mx-auto px-4">
        <article className="py-6">
          <NextSeo
            title={tinaData.post.title}
            titleTemplate="%s | MatíasVerdier.com"
            description={tinaData.post.description}
            canonical={`https://matiasverdier.com/posts/${tinaData.slug}`}
            openGraph={{
              site_name: 'MatíasVerdier.com',
              locale: 'es_UY',
              url: `https://matiasverdier.com/posts/${tinaData.slug}`,
              title: tinaData.post.title,
              description: tinaData.post.description,
              type: 'article',
              article: {
                publishedTime: tinaData.post.date,
                authors: ['Matías Verdier'],
              },
              images: tinaData.post.coverimage
                ? [
                    {
                      url: tinaData.post.coverimage,
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
            url={`https://matiasverdier.com/posts/${tinaData.slug}`}
            title={tinaData.post.title}
            images={tinaData.post.coverimage ? [tinaData.post.coverimage] : []}
            datePublished={tinaData.post.date}
            authorName={['Matías Verdier']}
            publisherName="Matías Verdier"
            publisherLogo={`https://matiasverdier.com/favicon.png`}
            description={tinaData.post.description}
          />

          <div className="prose prose-lg mx-auto max-w-2xl">
            <h1 className="pt-4">{tinaData.post.title}</h1>
          </div>

          <div className="mx-auto max-w-2xl">
            <div className="mb-6 pl-1 uppercase text-gray-500">
              {format(parseISO(tinaData.post.date), `dd 'de' MMMM, yyyy`, {
                locale: es,
              })}
            </div>
          </div>

          <div className="mx-auto max-w-2xl">
            {tinaData.post.coverimage &&
            tinaData.post.include_coverimage_in_body ? (
              <div className="relative h-96 w-full">
                <Image
                  src={tinaData.post.coverimage}
                  alt="Post hero image"
                  fill
                  sizes="700px"
                  style={{
                    objectFit: 'cover',
                  }}
                  priority
                />
              </div>
            ) : null}
            <div className="prose prose-lg prose-indigo">
              <TinaMarkdown content={tinaData.post.body} />
            </div>
          </div>
        </article>

        <section className="mx-auto mb-20 max-w-screen-sm lg:max-w-screen-md lg:px-10">
          <Giscus
            repo="MatiasVerdier/matiasverdier.com"
            repoId="MDEwOlJlcG9zaXRvcnkzMTg3MTMzMzc="
            category="Posts"
            categoryId="DIC_kwDOEv8t-c4CAPqj"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            theme="light"
          />
        </section>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  let data = {};
  let query = {};
  let variables = { relativePath: `${params.slug}.mdx` };

  try {
    const res = await client.queries.post(variables);
    query = res.query;
    data = res.data;
    variables = res.variables;
  } catch (error) {
    console.log(error);
  }

  const dataWithSlug = { ...data, slug: params.slug };

  return {
    props: {
      variables,
      data: dataWithSlug,
      query,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();

  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { slug: post.node._sys.filename },
    })),
    fallback: false,
  };
};
