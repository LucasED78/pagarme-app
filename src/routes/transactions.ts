import Router, { RouterParamContext } from "@koa/router";
import { Middleware } from "koa";
import "../controllers/TransactionController";
import { Inject } from "../decorators/inject";
import { Injectable } from "../decorators/injectable";
import { ITransactionController } from "../types/controller";

@Injectable("TransactionRoutes")
class TransactionsRoutes extends Router {
  @Inject("TransactionController")
  private transactionsController!: ITransactionController;

  constructor() {
    super({ prefix: '/transaction' });
  }

  get allRoutes(): Middleware<any, RouterParamContext> {
    this.post('/', this.transactionsController.create);
    this.get('/', this.transactionsController.all);
    this.post('/refund/:transactionId', this.transactionsController.refund)

    return this.routes();
  }
}

export default TransactionsRoutes;