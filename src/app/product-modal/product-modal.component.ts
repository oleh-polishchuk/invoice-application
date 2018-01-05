import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Product } from "../product/product";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: [ './product-modal.component.css' ]
})
export class ProductModalComponent implements OnInit {

  product: Product = new Product();

  constructor(public dialogRef: MatDialogRef<ProductModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
