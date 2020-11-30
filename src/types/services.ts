import { ITransactionsFilter, TransactionResponse } from "./transaction";

export interface ITransactionService {
  filter(filter: ITransactionsFilter, transactions: TransactionResponse[]): TransactionResponse[]
}