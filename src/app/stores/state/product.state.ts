import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { AddProduct } from 'src/app/model/User.model';
import {
  AddSellerProduct,
  EditSellerProduct,
  GetSellerProduct,
} from '../action/product.action';
import { MainService } from '../main.service';
import { tap } from 'rxjs';

export class AddProductModel {
  products!: AddProduct[];
  productLoaded!: boolean;
  message!: string;
}

@State<AddProductModel>({
  name: 'product',
  defaults: {
    products: [],
    productLoaded: false,
    message: '',
  },
})
@Injectable()
export class ProductState {
  constructor(private _mainService: MainService, private store: Store) {}

  @Selector()
  static getSellerProductsList(state: AddProductModel) {
    return state.products;
  }

  @Selector()
  static isSellerAllProductLoaded(state: AddProductModel) {
    return state.productLoaded;
  }

  @Action(GetSellerProduct)
  getsellerProducts(
    { getState, setState }: StateContext<AddProductModel>,
    { payload }: any
  ) {
    return this._mainService.getSellerProduct(payload).pipe(
      tap((res: any) => {
        const state = getState();
        if (res.data.length == payload.size) {
          setState({
            ...state,
            products: res.data,
          });
        } else {
          setState({
            ...state,
            products: res.data,
            productLoaded: true,
          });
        }
      })
    );
  }

  @Selector()
  static afterAddProductResp(state: AddProductModel) {
    return state.message;
  }

  @Action(AddSellerProduct)
  addSellerProduct(
    { getState, patchState }: StateContext<AddProductModel>,
    { payload }: any
  ) {
    return this._mainService.addSellerProduct(payload).pipe(
      tap((res: any) => {
        const state = getState();
        patchState({
          products: [...state?.products, res?.data],
          message: res.message,
        });
      })
    );
  }

  @Action(EditSellerProduct)
  editSellerProduct(
    { getState, patchState }: StateContext<AddProductModel>,
    { payload }: any
  ) {
    return this._mainService.editSellerProduct(payload).pipe(
      tap((val: any) => {
        const id = payload.get('_id');
        let state = getState();
        const index = state.products.findIndex((a: any) => a._id == id);
        state['products'][index] = val?.updateData;
        patchState({
          products: state.products,
          message: val.message,
        });
      })
    );
  }
}
