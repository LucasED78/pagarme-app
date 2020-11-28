import { ParameterizedContext } from "koa";
import { PagarmeResponse } from "./http";
import { TransactionResponse } from "./transaction";

export interface ITransactionController {
  create(ctx: ParameterizedContext): Promise<void>
  all(ctx: ParameterizedContext): Promise<void>;
}