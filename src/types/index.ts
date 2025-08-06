export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  hint: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}
