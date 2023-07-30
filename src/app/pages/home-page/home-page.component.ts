import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/User.model';
import { GetUserInfo } from 'src/app/stores/action/user.action';
import { UserState } from 'src/app/stores/state/user.state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  @Select(UserState.getUser) userObservable$: Observable<UserModel> | undefined;
  user: UserModel | undefined;
  onUserLoadedSubscription?: Subscription;

  constructor(private toastr: ToastrService, private store: Store) {}

  ngOnInit() {
    this.getuserInformation();
  }

  public makeProductLike(event: boolean): void {
    this.toastr.info(
      `You ${event ? 'Liked' : 'Disliked'} This Product`,
      'Trigger Jeans',
      {
        timeOut: 3000,
        progressBar: false,
        closeButton: false,
        tapToDismiss: true,
        toastClass: 'custom-toast', // Apply custom CSS class to the toast
      }
    );
  }

  private getuserInformation(): void {
    this.onUserLoadedSubscription = this.userObservable$?.subscribe(
      (res: any) => {
        if (res && res?.userLoaded) {
          this.user = res.user;
        } else {
          this.store.dispatch(new GetUserInfo());
        }
      }
    );
  }

  ngOnDestroy() {
    this.onUserLoadedSubscription?.unsubscribe();
  }
}
