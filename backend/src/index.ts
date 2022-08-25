import { AppDataSource } from './configs/data-source';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error-middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { usersRouter } from './routes/client.router';
import { authRouter } from './routes/auth.router';
import { addresseeRouter } from './routes/adressee.router';
import { transferRouter } from './routes/transfer.router';
import { accountTypeRouter } from './routes/account_type.router';

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    /**
     * App Variables
     */

    if (!process.env.SERVER_PORT) {
      process.exit(1);
    }

    const PORT: number = parseInt(process.env.SERVER_PORT as string, 10);

    const app = express();

    /**
     *  App Configuration
     */

    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    const base_path = '/api_check/v1';

    app.use(
      base_path,
      usersRouter,
      authRouter,
      addresseeRouter,
      transferRouter,
      accountTypeRouter
    );
    app.use(errorHandler);
    app.use(notFoundHandler);

    /**
     * Server Activation
     */

    app.listen(PORT, () => {
      console.log(`Server running: http://localhost:${PORT + base_path}`);
    });
  })
  .catch((error) => console.log('[DATABASE ERROR]: ' + error));
