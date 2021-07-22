/* eslint-disable no-console */
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import ProductController from './products/product.controller';
import App from './app/app';

dotenv.config();

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

    console.log('connected to DB');

    const app = new App([new ProductController()], 5000);
    app.listen();
  } catch (e) {
    console.log(e.message);
  }
};

start();
