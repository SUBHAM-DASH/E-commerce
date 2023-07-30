import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss'],
})
export class CardProductComponent implements OnInit {

  @Output() productLike = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}
  isLiked: boolean = false;

  handleHeartClick(): void {
    this.isLiked = !this.isLiked;
    this.productLike.emit(this.isLiked);
  }
}
