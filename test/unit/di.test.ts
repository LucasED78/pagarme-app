import Container from '../../src/singletons/container';
import TransactionsController from '../../src/controllers/TransactionController';
import TransactionService from '../../src/services/TransactionService';

describe('Dependency Injecton', () => {
  const container = Container.instance;
  
  new TransactionsController();

  test('should contain an instance of TransactionService', () => {
    expect(container.resolve('TransactionService'))
      .toBeInstanceOf(TransactionService)
  })
  
})