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
              <TinaMarkdown
                content={tinaData.post.body}
                components={{ img: PostImage }}
              />
            </div>
          </div>
        </article>

        <div className="relative isolate mx-auto my-12 max-w-5xl overflow-hidden bg-gray-900">
          <div className="px-6 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Necesitas una mentoría Gratuita?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Puedes agendar una sesión{' '}
                <span className="font-bold text-white">gratuita</span> de 30 min
                para responder dudas sobre código, entrevistas, avanzar en tu
                carrera o desarrollo web en general
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="https://cal.com/matiasvj/mentoria-30"
                  target="_blank"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Reservar
                </a>
              </div>
            </div>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                <stop stopColor="#7775D6" />
                <stop offset="1" stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <section className="mx-auto mb-20 max-w-screen-sm lg:max-w-screen-md lg:px-10">
          <h2 className="mb-2 text-center text-3xl">Deja tu comentario</h2>
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

function PostImage(props) {
  return (
    <Image
      src={props.url}
      alt={props.alt}
      width={650}
      height={500}
      style={{
        objectFit: 'cover',
      }}
    />
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
