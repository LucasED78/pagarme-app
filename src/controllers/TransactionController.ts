import { ITransactionController } from "../types/controller";
import { ETransactionStatus, RefundRequest, Transaction, TransactionResponse } from "../types/transaction";
import { ITransactionService } from "../types/services";
import { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import PagarmeClient from "../client/pagarme";
import { Injectable } from "../decorators/injectable";
import { Inject } from "../decorators/inject";
import '../services/TransactionService';
import { NullOr } from "src/types/object";

@Injectable("TransactionController")
class TransactionController implements ITransactionController {
  @Inject("TransactionService")
  transactionsService!: ITransactionService;

  create = async (ctx: ParameterizedContext<DefaultContext, DefaultState>): Promise<void> => {
    try { 
      const transaction = ctx.request.body['transaction'] as Transaction;

      const clientResponse = await PagarmeClient.client;

      const response = await clientResponse.transactions.create(transaction);

      ctx.status = 200

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

        ctx.status = 200

        ctx.body = {
          success: true,
          data: transactions,
        }
      }

      ctx.status = 200

      ctx.body = {
        success: true,
        data: response
      }
    } catch(error) {      
      console.log(error);
      
      ctx.body = {
        success: false,
        error
      }
    }
  }

  refund = async (ctx: ParameterizedContext<DefaultState, DefaultContext>): Promise<void> => {
    try {
      const { transactionId } = ctx.params;
      const bankRefund = ctx.body as NullOr<RefundRequest>;

      if (transactionId) {
        const client = await PagarmeClient.client;

        if (client) {
          const response = await client.transactions.refund({ id: transactionId }) as TransactionResponse;

          if (response) {
            ctx.status = 200;

            ctx.body = {
              success: true,
              data: response
            }
          } else {
            throw new Error("sorry, we can't proccess your refund")
          }
        }
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