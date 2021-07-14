import { ReactNode, useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  title: string;
  id: number;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post("/transactions", transactionInput);
    const { transaction } = response.data;

    setTransactions((prevValue) => [
      ...prevValue,
      { ...transaction, createdAt: new Date() },
    ]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};
