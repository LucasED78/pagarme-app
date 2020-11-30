import { ITransactionsFilter, TransactionResponse } from '../types/transaction';
import { ITransactionService } from '../types/services';
import { Injectable } from '../decorators/injectable';

@Injectable("TransactionService")
class TransactionService implements ITransactionService {
  filter = (filter: ITransactionsFilter, transactions: TransactionResponse[]): TransactionResponse[] => {
    const filteredTransactions = transactions.filter(transaction => {      
      if (filter?.status && filter?.paymentMethod) {
        return transaction.status === filter.status && transaction.payment_method === filter.paymentMethod;
      } else if (filter?.status) {
        return transaction.status === filter.status;
      } else {
        return transaction.payment_method === filter.paymentMethod;
      }
    })

    return filteredTransactions;
  }
}

export default TransactionService;