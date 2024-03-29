import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';


interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}
// para criar um contexto, precisamos criar uma interface que será o contexto, mas podemos usar também uma maneira diferente com typescript
// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }
//aqui eu estou falando que o transactionInput herdará todos os campos do transaction, menos o Id e o createAt
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

//posso fazer tambem utilizando pick
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;
interface TransactionsProviderProps {
    children:ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction(transaction: TransactionInput) : Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export  function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
      api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput : TransactionInput) {
 
     const response =  await  api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date().toISOString(),
     })
     const { transaction } = response.data;

     setTransactions([
         ...transactions,
         transaction,
     ]);
    }


    return(
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

