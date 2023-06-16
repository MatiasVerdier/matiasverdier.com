import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-cloudinary/dist/handlers';

import { isAuthorized } from '@tinacms/auth';
import { env } from '../../../env.mjs';

export const config = mediaHandlerConfig;

export default createMediaHandler({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  authorized: async (req, _res) => {
    try {
      if (env.NODE_ENV === 'development') {
        return true;
      }

      const user = await isAuthorized(req);

      return user && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
