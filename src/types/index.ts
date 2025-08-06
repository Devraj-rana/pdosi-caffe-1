export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategoryName;
  hint: string;
}

export type MenuCategoryName = 
  | "Patty"
  | "Sandwich"
  | "Waffle"
  | "Sweet Corn"
  | "Burger"
  | "Maggi"
  | "Pasta"
  | "Snacks"
  | "Milkshake"
  | "Chai"
  | "Mojito"
  | "Coffee";

export interface MenuCategory {
  name: MenuCategoryName;
  items: Omit<MenuItem, 'category'>[];
}
