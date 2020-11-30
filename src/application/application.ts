import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import notFoundRoute from '../middlewares/notfound';
import { Inject } from '../decorators/inject';
import { Injectable } from '../decorators/injectable';
import TransactionsRoutes from '../routes/transactions';
import { IApplication } from '../types/application';

@Injectable("Application")
class Application implements IApplication {
  private koa: Koa<Koa.DefaultState, Koa.DefaultContext>;
  @Inject("TransactionRoutes")
  private transactionRoutes!: TransactionsRoutes;

  constructor() {
    this.koa = new Koa();
  }

  setupMiddlewares = (): void => {
    this.koa
      .use(notFoundRoute)
      .use(bodyParser())
      .use(this.transactionRoutes.allRoutes)
      .use(this.transactionRoutes.allowedMethods())
  }

  start = (): void => {
    this.setupMiddlewares();
    this.koa.listen(3000);
  }
}

export default Application;