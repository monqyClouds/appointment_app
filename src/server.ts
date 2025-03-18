import http from 'http';

import {PORT} from './config';

import app from './app';
import {connectDB, disconnectDB} from './utils';
import {debug} from 'console';

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

startServer()
  .then(async () => {
    await connectDB();
  })
  .catch(err => {
    console.error(err);
    throw err;
  });

process.on('SIGTERM', () => {
  handleShutdown();
});

process.on('uncaughtExceptionMonitor', async err => {
  console.error(err);
});

function handleShutdown() {
  server.close(async () => {
    await disconnectDB();

    debug('HTTP Server closed');
  });
}
