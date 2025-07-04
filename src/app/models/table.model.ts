export interface Table {
  id: number;
  name: string;
  people: number;
  isPaid: boolean;
  items: TableItem[];
}

export interface TableItem {
  name: string;
  quantity: number;
  price: number;
}
