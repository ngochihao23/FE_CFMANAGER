export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  storeId: string;
  isAvailable: boolean;
  imageUrl?: string;
}
