import { DefaultContext, DefaultState, Next, ParameterizedContext } from "koa";

export default async (ctx: ParameterizedContext<DefaultContext, DefaultState>, next: Next): Promise<void> => {
  ctx.status = 404;
    
  ctx.body = {
    success: false,
    error: 'route not found'
  }

  await next();
}