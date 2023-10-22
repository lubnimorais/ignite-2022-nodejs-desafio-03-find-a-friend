import 'dotenv/config';

import { env } from '@env/index';

export default {
  jwt: {
    JWT_SECRET: env.JWT_SECRET,
    EXPIRES_IN: env.EXPIRES_IN,
  },
};
