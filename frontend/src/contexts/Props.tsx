export type UserProps = {
  name: string;
  email: string;
  balance: number;
  transactions: {
    id: number;
    title: string;
    type: string;
    category: string;
    amount: number;
    date: Date;
  }[];
  cards: {
    id: number;
    title: string;
    type: string;
    limit: number;
    balance: number;
  }[];
  goals: {
    id: number;
    title: string;
    type: string;
    amount: number;
    balance: number;
  }[];
};

export type TransactionProps = {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  date: Date;
}[];
