import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import Image from 'next/legacy/image';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { Giscus } from '@giscus/react';

const root = process.cwd();

export default function Post({ mdxSource, frontMatter }) {
  return (
    <div>
      <div className="container mx-auto px-4">
        <article className="py-6">
          <NextSeo
            title={frontMatter.title}
            titleTemplate="%s | MatíasVerdier.com"
            description={frontMatter.description}
            canonical={`https://matiasverdier.com/posts/${frontMatter.slug}`}
            openGraph={{
              site_name: 'MatíasVerdier.com',
              locale: 'es_UY',
              url: `https://matiasverdier.com/posts/${frontMatter.slug}`,
              title: frontMatter.title,
              description: frontMatter.description,
              type: 'article',
              article: {
                publishedTime: frontMatter.date,
                authors: ['Matías Verdier'],
              },
              images: frontMatter.coverimage
                ? [
                    {
                      url: frontMatter.coverimage,
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
            url={`https://matiasverdier.com/posts/${frontMatter.slug}`}
            title={frontMatter.title}
            images={frontMatter.coverimage ? [frontMatter.coverimage] : []}
            datePublished={frontMatter.date}
            authorName={['Matías Verdier']}
            publisherName="Matías Verdier"
            publisherLogo={`https://matiasverdier.com/favicon.png`}
            description={frontMatter.description}
          />

          <div className="max-w-2xl mx-auto prose prose-lg">
            <h1 className="pt-4">{frontMatter.title}</h1>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="mb-6 pl-1 text-gray-500 uppercase">
              {format(parseISO(frontMatter.date), `dd 'de' MMMM, yyyy`, {
                locale: es,
              })}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            {frontMatter.coverimage &&
            frontMatter.include_coverimage_in_body ? (
              <div className="relative w-full h-96">
                <Image
                  src={frontMatter.coverimage}
                  alt="Post hero image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : null}
            <div className="prose prose-lg prose-indigo">
              <MDXRemote {...mdxSource} />
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

export async function getStaticProps({ params }) {
  const { slug } = params;
  const source = fs.readFileSync(
    path.join(root, 'content', `${slug}.mdx`),
    'utf8'
  );
  const { data, content } = matter(source);
  const mdxSource = await serialize(content);

  // Return not found if the environment is production and the post is draft
  if (process.env.NODE_ENV === 'production' && data.draft) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      mdxSource,
      frontMatter: { ...data, slug: `https://matiasverdier.com/posts/${slug}` },
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: fs.readdirSync(path.join(root, 'content')).map((p) => {
      return {
        params: {
          slug: p.replace(/\.mdx/, ''),
        },
      };
    }),
    fallback: false,
  };
}
