import { Model } from 'mongoose';

//Type for name
export type TFullName = {
  firstName: string;
  lastName: string;
};
//Type for address
export type TAddress = {
  street: string;
  city: string;
  country: string;
};

//Type for orders
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

//Type for users
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
};

// exporting user model here...
export interface UserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
  passwordEncryption(password:string):Promise<string>;
}