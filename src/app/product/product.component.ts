import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { Product } from './product';
import { ProductSnackComponent } from "../product-snack/product-snack.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { ProductSnack } from "../product-snack/product-snack";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.scss' ]
})
export class ProductComponent implements OnInit {

  productSnack: ProductSnack;
  productCopy: Product;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private location: Location,
              private productService: ProductService) {}

  @Input()
  product: Product;

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  cancel() {
    this.location.back();
  }

  saveProduct() {
    this.productService.updateProduct(this.product)
      .subscribe(_ => this.location.back());
  }

  deleteProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productCopy = Object.assign({}, this.product);
    this.productService.deleteProduct(id)
      .subscribe(_ => {
        this.location.back();
        this.showNotification('Product deleted');
      });
  }

  /**
   * Show notification
   *
   * @param message
   */
  showNotification(message: string) {
    this.snackBar.openFromComponent(ProductSnackComponent, this.getProductSnackConfig(message));
  }

  /**
   * Method return instance of product snack/notification
   *
   * @param message
   * @returns {ProductSnack}
   */
  private getProductSnackConfig(message: string): MatSnackBarConfig {
    return {
      duration: 60000,
      data: {
        productSnack: {
          message: message,
          button: {
            caption: 'Undo',
            action: () => {
              this.undoDelete(this.productCopy);
            }
          }
        } as ProductSnack
      }
    } as MatSnackBarConfig;
  }

  undoDelete(product: Product) {
    this.productService.saveProduct(product)
      .subscribe(_ => this.router.navigate(['/products']));
  }

}
