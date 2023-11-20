export interface UserInterface {
  id: number;
  email: string;
  fullName: string;
  userRole: string;
  createdDate: Date;
}

export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdDate: Date;
  email: string;
  status: string;
  barCode: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

// TODO:
export interface OrderInterface {
  id: number;
  createdDate: string;
  dateNow: string;
  email: string;
  orderJsonList: string;
  status: string;
  totalPrice: number;
}

export interface UserInterfaceWithPassword {
  id: number;
  email: string;
  fullName: string;
  userRole: string;
  createdDate: Date;
  password: string;
}
