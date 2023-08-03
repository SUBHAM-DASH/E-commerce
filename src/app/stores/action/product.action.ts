import { AddProduct } from 'src/app/model/User.model';

export class AddSellerProduct {
  static readonly type = '[Product] Add';
  constructor(public payload: any) {}
}
