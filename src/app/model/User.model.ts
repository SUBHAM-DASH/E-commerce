export interface UserModel {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobilenumber: string;
  walletbalance: number;
  cart: string[];
  wishlist: string[];
  address: string[];
  created_at: string;
}
