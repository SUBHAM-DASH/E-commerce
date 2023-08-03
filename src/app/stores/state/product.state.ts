import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AddProduct } from 'src/app/model/User.model';
import { AddSellerProduct } from '../action/product.action';
import { MainService } from '../main.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export class AddProductModel {
  products!: AddProduct[];
  productLoaded!: boolean;
}

@State<AddProductModel>({
  name: 'product',
  defaults: {
    products: [],
    productLoaded: false,
  },
})
@Injectable()
export class ProductState {
  constructor(
    private _mainService: MainService,
    private toastr: ToastrService
  ) {}

  @Action(AddSellerProduct)
  addSellerProduct(
    { getState, patchState }: StateContext<AddProductModel>,
    { payload }: any
  ) {
    return this._mainService.addSellerProduct(payload).pipe(
      tap((res: any) => {
        const state = getState();
        console.log(res);
        patchState({
          products: [...state.products, res.data],
        });
      })
    );
  }
}
