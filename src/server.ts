import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  await mongoose.connect(config.dataBaseUrl as string);

  app.listen(config.port, () => {
    console.log(`the Mighty server  listening on port ${config.port}`);
  });
}

main();