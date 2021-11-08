import { Server } from 'miragejs';
import { BASE_PATH, SECRET } from './constants';

export const runServer = () => {
  let server = new Server({ timing: 2000 });

  server.get(BASE_PATH, {});
  server.post(BASE_PATH, (_, req) => {
    const { input } = JSON.parse(req.requestBody);

    if (input !== SECRET) {
      return { success: false };
    }
    return { success: true };
  });
};
