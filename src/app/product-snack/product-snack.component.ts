import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from "@angular/material";
import { ProductSnack } from "./product-snack";

@Component({
  selector: 'app-product-snack',
  templateUrl: './product-snack.component.html',
  styleUrls: ['./product-snack.component.scss']
})
export class ProductSnackComponent implements OnInit {

  productSnack: ProductSnack;

  constructor(public snackRef: MatSnackBarRef<ProductSnackComponent>) { }

  ngOnInit() {
    this.getProductSnack();
  }

  getProductSnack() {
    const snackBarConfigData = this.snackRef.containerInstance.snackBarConfig.data;
    if (snackBarConfigData) {
      this.productSnack = snackBarConfigData.productSnack;
    }
  }

  action() {
    this.productSnack.button.action();
    this.snackRef.dismiss();
  }

}
