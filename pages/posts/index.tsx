import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';
import { compareDesc, parseISO } from 'date-fns';
import { postFilePaths, POSTS_PATH } from '../../utils/mdx-utils';
import { NextSeo } from 'next-seo';

export default function Posts({ posts }) {
  return (
    <div>
      <div className="container mx-auto px-4">
        <NextSeo
          title="Blog"
          titleTemplate="%s | MatíasVerdier.com"
          canonical="https://matiasverdier.com/posts"
          openGraph={{
            site_name: 'MatíasVerdier.com',
            locale: 'es_UY',
            url: `https://matiasverdier.com/posts`,
          }}
          twitter={{
            handle: `@matiasvj`,
            site: '@matiasvj',
          }}
        />

        <div className="py-6">
          <div className="max-w-2xl mx-auto prose prose-lg mb-6">
            <h1 className="pt-4">Blog</h1>
          </div>

          <ul className="max-w-2xl mx-auto flex flex-col space-y-4 prose prose-indigo">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  as={`/posts/${post.slug}`}
                  href={`/posts/[slug]`}
                  className="text-xl"
                >
                  {post.data.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function getStaticProps() {
  const posts = postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        slug: filePath.replace(/\.mdx?$/, ''),
      };
    })
    .sort((a, b) => compareDesc(parseISO(a.data.date), parseISO(b.data.date)));

  return { props: { posts } };
}
