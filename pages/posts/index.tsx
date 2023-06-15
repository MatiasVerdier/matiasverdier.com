import { compareDesc, parseISO } from 'date-fns';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import client from '../../tina/__generated__/client';

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
          <div className="prose prose-lg mx-auto mb-6 max-w-2xl">
            <h1 className="pt-4">Blog</h1>
          </div>

          <ul className="prose prose-indigo mx-auto flex max-w-2xl flex-col space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  as={`/posts/${post.slug}`}
                  href={`/posts/[slug]`}
                  className="text-xl"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsResponse = await client.queries.postConnection({ sort: 'date' });
  const posts = postsResponse.data.postConnection.edges
    .map(({ node }) => {
      return {
        slug: `${node._sys.filename}`,
        title: node.title,
        date: node.date,
      };
    })
    .sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));

  return { props: { posts } };
}
