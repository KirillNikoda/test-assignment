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

    this.router.delete(`${this.path}/:id`, this.deleteProduct);
  }

  private async getOneProduct(req: express.Request, res: express.Response) {
    const product = await ProductModel.findById(req.params.id);
    res.send(product);
  }

  private async getAllProducts(req: express.Request, res: express.Response) {
    const products = await ProductModel.find();
    res.send(products);
  }

  private async createProduct(req: express.Request, res: express.Response) {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201);
    res.send(newProduct);
  }

  private async deleteProduct(req: express.Request, res: express.Response) {
    await ProductModel.findByIdAndDelete(req.params.id);

    res.status(204);
    res.send('Successfully deleted');
  }
}

export default ProductController;
