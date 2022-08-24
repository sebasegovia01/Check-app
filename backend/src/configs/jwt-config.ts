
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  jwtSecret: process.env.JWT_ACCESS_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION_TIME
};