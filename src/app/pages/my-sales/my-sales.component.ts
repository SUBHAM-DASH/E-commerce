import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { environment } from 'environment';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, map } from 'rxjs';
import { GetSellerProduct } from 'src/app/stores/action/product.action';
import { ProductState } from 'src/app/stores/state/product.state';

interface MySaleProducts {
  color: string;
  date: string | undefined;
  description: string | undefined;
  images: string | undefined;
  price: string | undefined;
  productname: string | undefined;
  producttitle: string | undefined;
  size: string | undefined;
}

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.scss'],
})
export class MySalesComponent implements OnInit, OnDestroy {
  serverUrl: string = environment.url;
  columnsToDisplay = [
    'date',
    'color',
    'description',
    'images',
    'price',
    'productname',
    'producttitle',
    'size',
    'action',
  ];
  dataSource: MySaleProducts[] = [];

  @Select(ProductState.getSellerProductsList) products$:
    | Observable<any[]>
    | undefined;

  @Select(ProductState.isSellerAllProductLoaded)
  isProductsLoaded$!: Observable<boolean>;
  productLoadedSubscription!: Subscription;

  scrollDistance = 2;
  upScrollDistance = 1.5;
  visible: boolean = true;

  constructor(
    private store: Store,
    private toster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts({ page: 1, size: 5 });
    this.products$
      ?.pipe(
        map((val: any) => {
          return val.map((a: any) => {
            return {
              date: new Date(a.date).toDateString(),
              color: JSON.parse(a.color),
              description: a.description,
              images: JSON.parse(a.images),
              price: a.price,
              productname: a.productname,
              producttitle: a.producttitle,
              size: JSON.parse(a.size),
              _id: a._id,
            };
          });
        })
      )
      .subscribe((res: any) => {
        const nextPageData = [...res];
        this.dataSource = this.dataSource.concat(nextPageData);
      });
  }

  public getProducts(data: any) {
    this.store.dispatch(new GetSellerProduct(data));
  }

  public onEdit(elem: any) {
    this.router.navigate(['/pages/add-newproduct'], { queryParams: elem });
  }

  public onDelete(elem: any) {
    console.log(elem);
  }

  public loadMoreData() {
    this.visible = false;
    this.productLoadedSubscription = this.isProductsLoaded$.subscribe(
      (response: boolean) => {
        if (response) {
          this.toster.info('Sorry..No More products!');
          setTimeout(() => {
            this.visible = true;
          }, 1500);
          return;
        } else {
          this.getProducts({ page: this.scrollDistance, size: 5 });
        }
      }
    );
  }

  ngOnDestroy() {
    this.productLoadedSubscription?.unsubscribe();
  }
}
