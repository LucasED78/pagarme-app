import Koa from 'koa';
import TransactionController from './controllers/TransactionController';
import TransactionService from './services/TransactionService';
import TransactionsRoutes from './routes/transactions';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

const transactionsRoutes = new TransactionsRoutes(new TransactionController(new TransactionService()));

app
  .use(bodyParser())
  .use(transactionsRoutes.allRoutes)
  .use(transactionsRoutes.allowedMethods())

app.listen(3000);