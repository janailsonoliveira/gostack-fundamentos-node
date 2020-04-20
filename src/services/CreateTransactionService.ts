import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: "income" | "outcome"
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    // TODO
    const isValidType = ['income', 'outcome'].includes(type);
    if(!isValidType){
      throw Error('Type is not valid');
    }
    const { total } = this.transactionsRepository.getBalance();

    if(!!total){
      if(value > total && type === 'outcome'){
        throw Error('Value is not valid');
      }
    }
    
    const transaction = this.transactionsRepository.create(title, value, type);
    
    return transaction;
  }
}

export default CreateTransactionService;
