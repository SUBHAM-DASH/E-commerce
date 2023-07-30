import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel } from 'src/app/model/User.model';
import { GetUserInfo } from '../action/user.action';
import { MainService } from '../main.service';
import { tap } from 'rxjs';

// STATE MODEL
export class UserStateModel {
  user!: UserModel;
  userLoaded!: boolean;
}

//STATE
@State<UserStateModel>({
  name: 'users',
  defaults: {
    user: {
      _id: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      mobilenumber: '',
      walletbalance: 0,
      cart: [],
      wishlist: [],
      address: [],
      created_at: '',
    },
    userLoaded: false,
  },
})
@Injectable()
export class UserState {
  constructor(private _mainService: MainService) {}

  @Selector()
  static getUser(state: UserStateModel) {
    return state;
  }

  @Action(GetUserInfo)
  getUser({ getState, setState }: StateContext<any>) {
    return this._mainService.getUserInformation().pipe(
      tap((user: any) => {
        const state = getState();
        setState({
          ...state,
          user: user.data,
          userLoaded: true,
        });
      })
    );
  }
}
