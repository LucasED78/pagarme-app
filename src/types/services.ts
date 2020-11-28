import { ITransactionsFilter, TransactionResponse } from "./transaction";

export default interface ITransactionService {
  filter(filter: ITransactionsFilter, transactions: TransactionResponse[]): TransactionResponse[]
}