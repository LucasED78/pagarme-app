import Koa from 'koa';

export interface IApplication {
  setupMiddlewares: () => void
  start: () => void;
}