import { Server } from 'miragejs';
import { BASE_PATH, SECRET } from './constants';

export const runServer = () => {
  let server = new Server({ timing: 2000 });

  server.post(BASE_PATH, (_, req) => {
    // console.log('POST: ', JSON.parse(req.requestBody));
    const { input } = JSON.parse(req.requestBody);
    // console.log('VAL: ', input);
    if (input !== SECRET) {
      return { success: false };
    }
    return { success: true };
  });
};
