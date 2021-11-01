import { Server } from 'miragejs';
import { BASE_PATH } from './constants';

export const runServer = () => {
  let server = new Server({ timing: 2000 });
  server.get(BASE_PATH, {});
  server.post(BASE_PATH, (_, request) => {
    return JSON.parse(request.requestBody);
  });
};
