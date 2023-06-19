import { env } from '../env.mjs';
import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
  env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.HEAD ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  'main';

export default defineConfig({
  branch,
  clientId: env.NEXT_PUBLIC_TINA_CLIENT_ID, // Get this from tina.io
  token: env.NEXT_PUBLIC_TINA_TOKEN, // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary');
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
          },
          {
            type: 'image',
            name: 'coverimage',
            label: 'Cover Image',
          },
          {
            type: 'datetime',
            label: 'Posted Date',
            name: 'date',
            ui: {
              dateFormat: 'DD MMMM YYYY',
            },
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'boolean',
            name: 'include_coverimage_in_body',
            label: 'Include cover Image in content',
          },
        ],
        ui: {
          router: ({ document }) => `/posts/${document._sys.filename}`,
        },
      },
    ],
  },
});
