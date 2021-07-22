/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as express from 'express';
import ProductModel from './product.model';

class ProductController {
  public path: string = '/products';

  public router: express.Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllProducts);
    this.router.get(`${this.path}/:id`, this.getOneProduct);

    this.router.post(this.path, this.createProduct);

    this.router.put(`${this.path}/:id`, this.updateProduct);

    this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  private async getOneProduct(req: express.Request, res: express.Response) {
    try {
      const product = await ProductModel.findById(req.params.id);
      res.send(product);
    } catch (e) {
      console.log(e.message);
    }
  }

  private async getAllProducts(req: express.Request, res: express.Response) {
    try {
      const products = await ProductModel.find();
      res.send(products);
    } catch (e) {
      console.log(e.message);
    }
  }

  private async updateProduct(req: express.Request, res: express.Response) {
    const properties = ['name', 'price', 'remainingCount'];
    const bodyProperties = Object.keys(req.body);
    console.log(bodyProperties, properties);

    let isValid: boolean = true;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < properties.length; i++) {
      if (!bodyProperties.includes(properties[i] as string)) {
        res.status(400).send('Invalid property');
        isValid = false;
        console.log(bodyProperties[i], properties);

        break;
      }
    }

    if (!isValid) {
      return;
    }

    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
      res.status(204).send(updatedProduct);
    } catch (e) {
      console.log(e.message);
    }
  }

  private async createProduct(req: express.Request, res: express.Response) {
    try {
      const newProduct = new ProductModel(req.body);
      await newProduct.save();
      res.status(201).send(newProduct);
    } catch (e) {
      console.log(e.message);
    }
  }

  private async deleteProduct(req: express.Request, res: express.Response) {
    try {
      await ProductModel.findByIdAndDelete(req.params.id);

      res.status(204).send('Successfully deleted');
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default ProductController;
