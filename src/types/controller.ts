import { ParameterizedContext } from "koa";

export interface ITransactionController {
  create(ctx: ParameterizedContext): Promise<void>
  all(ctx: ParameterizedContext): Promise<void>;
  refund(ctx: ParameterizedContext): Promise<void>
}