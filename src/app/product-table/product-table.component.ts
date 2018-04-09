import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SimpleTableConfig } from '../entities/simple-table-config';
import { Product } from '../product/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: [ './product-table.component.scss' ]
})
export class ProductTableComponent implements OnInit, DoCheck {

  displayedColumns = [ 'name', 'price', 'quantity', 'totalAmount', 'action' ];
  productDataSource = new MatTableDataSource();

  constructor(public router: Router) {}

  @Input()
  items: Product[];

  @Input()
  config: SimpleTableConfig;

  @Output()
  itemsChange: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  ngOnInit(): void {
    this.productDataSource.data = this.items;
  }

  ngDoCheck(): void {
    this.productDataSource.data = this.items;
  }

  /**
   * Method calculate total amount
   *
   * @param product
   * @returns {number}
   */
  getTotalAmount(product: Product) {
    return product.price * product.quantity;
  }

  /**
   * Method remove selected product from product list
   *
   * @param product
   */
  removeProduct(product: Product) {
    this.items = this.items.filter(item => item.id !== product.id);
    this.itemsChange.emit(this.items);
  }

  /**
   * Method redirect to edit product page
   * @param product
   */
  editProduct(product: Product) {
    this.router.navigate([ `/products/${product.id}` ]);
  }

  /**
   * Method verify if table is empty
   * @returns {boolean}
   */
  isEmptyTable() {
    return this.productDataSource.data && this.productDataSource.data.length === 0;
  }

}
