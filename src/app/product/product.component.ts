import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';
import { Product } from './product';
import { ProductSnackComponent } from "../product-snack/product-snack.component";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
import { ProductSnack } from "../product-snack/product-snack";
import { FormControl, FormGroup, NgForm } from "@angular/forms";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.scss' ]
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  productCopy: Product;
  productSnack: ProductSnack;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public snackBar: MatSnackBar,
              private location: Location,
              private productService: ProductService) {}

  ngOnInit() {
    this.productForm = this.getProductFormGroup();
    this.getProduct();
  }

  /**
   * Method return instance of product form group
   *
   * @returns {FormGroup}
   */
  private getProductFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });
  }

  getProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id)
        .subscribe(product => {
          this.productCopy = Object.assign({}, product);
          this.productForm.patchValue(product);
        });
    }
  }

  cancel() {
    this.location.back();
  }

  saveProduct(productForm: NgForm) {
    if (productForm.dirty && productForm.valid) {
      if (this.productForm.value.id) {
        this.productService.updateProduct(this.productForm.value)
          .subscribe(_ => this.router.navigate([ "/products" ]));
      } else {
        this.productService.saveProduct(this.productForm.value)
          .subscribe(_ => this.router.navigate([ "/products" ]));
      }
    }
  }

  /**
   * Method delete product
   */
  deleteProduct() {
    const id = +this.route.snapshot.paramMap.get('id');
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
      .subscribe(_ => this.router.navigate([ '/products' ]));
  }

}
