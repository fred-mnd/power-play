interface Product {
  ID: number;
  ImgUrl: string;
  Name: string;
}

interface Order extends Product {
  Quantity: number;
}

export interface IFinalTran {
  TransactionDate: string;
  Status: string;
  User: string;
  Orders: Order[];
}