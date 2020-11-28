import { ITransactionController } from "../types/controller";
import { ETransactionStatus, Transaction, TransactionResponse } from "../types/transaction";
import ITransactionService from "../types/services";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import PagarmeClient from "../client/pagarme";

class TransactionController implements ITransactionController {
  transactionsService: ITransactionService;

  constructor(transactionsService: ITransactionService) {
    this.transactionsService = transactionsService;
  }

  create = async (ctx: ParameterizedContext<DefaultContext, DefaultState>): Promise<void> => {
    try { 
      const transaction = ctx.request.body['transaction'] as Transaction;

      const clientResponse = await PagarmeClient.client;

      const response = await clientResponse.transactions.create(transaction);

      ctx.body = {
        success: true,
        data: response as TransactionResponse
      }
    } catch (error) {
      ctx.body = {
        success: false,
        error,
      }
    }
  }

  all = async (ctx: ParameterizedContext): Promise<void> => {
    try {
      const filters = ctx.query as { status: string | undefined, paymentMethod: string | undefined };
 
      const clientResponse = await PagarmeClient.client;

      const response = await clientResponse.transactions.all() as TransactionResponse[];

      let transactions: TransactionResponse[] = response;

      if (response) {
        if (filters) {
          let status;
          let paymentMethod;

          if (filters.status) {
            (<never>ETransactionStatus)[filters.status.toUpperCase()]
          }

          if (filters.paymentMethod) {
            (<never>ETransactionStatus)[filters.paymentMethod.toUpperCase()]
          }

          transactions = this.transactionsService.filter({ status, paymentMethod }, response);
        }

        ctx.body = {
          success: true,
          data: transactions,
        }
      }

      ctx.body = {
        success: true,
        data: response
      }
    } catch(error) {      
      ctx.body = {
        success: false,
        error
      }
    }
  }
}

export default TransactionController;