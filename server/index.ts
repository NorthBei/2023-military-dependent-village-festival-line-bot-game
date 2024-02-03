import 'module-alias/register';

import appRoot from 'app-root-path';
import express, { Request, Response } from 'express';
import fs from 'fs';
import next from 'next';
import path from 'path';

import { botHandler, middleware } from './lineBot';

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3200');
const app = next({ dev, port });
const webHandler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.post('/bot/webhook', middleware, async (req: Request, res: Response) => {
    try {
      await Promise.all(req.body.events.map(botHandler));
      res.status(200).send('OK');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Should put after line middleware
  // ref1: https://line.github.io/line-bot-sdk-nodejs/guide/webhook.html#build-a-webhook-server-with-express
  // ref2: https://github.com/line/line-bot-sdk-nodejs/issues/230
  server.use(express.json());

  // For LINE iamgemap message
  server.use('/imagemap', (req, res) => {
    // if whole url is https://example.com/imagemap/abc/1040, req.url will be `/abc/1040`
    const imagePath = decodeURI(path.join(appRoot.toString(), '/public/bot/assets/imagemap', req.url + '.png'));

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Image not found');
    }
  });

  server.all('*', (req: Request, res: Response) => {
    return webHandler(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
