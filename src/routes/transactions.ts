import Router, { RouterParamContext } from "@koa/router";
import { Middleware } from "koa";
import { ITransactionController } from "../types/controller";

class TransactionsRoutes extends Router {
  transactionsController: ITransactionController;

  constructor(transactionsController: ITransactionController) {
    super({ prefix: '/transaction' });

    this.transactionsController = transactionsController;
  }

  get allRoutes(): Middleware<any, RouterParamContext> {
    this.post('/', this.transactionsController.create)
    this.get('/', this.transactionsController.all);

    return this.routes();
  }
}

export default TransactionsRoutes;