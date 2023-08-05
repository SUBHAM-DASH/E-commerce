import { AddProduct } from 'src/app/model/User.model';
import { PageAndSize } from '../data-type';

export class AddSellerProduct {
  static readonly type = '[Product] Add';
  constructor(public payload: any) {}
}

export class GetSellerProduct {
  static readonly type = '[Product] Get';
  constructor(public payload: PageAndSize) {}
}

export class EditSellerProduct {
  static readonly type = '[Product] Edit';
  constructor(public payload: any) {}
}
