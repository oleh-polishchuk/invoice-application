import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';
import { MatSort, MatTableDataSource } from "@angular/material";
import { ProductSnack } from "../product-snack/product-snack";
import { Router } from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [ './products.component.scss' ]
})
export class ProductsComponent implements OnInit {

  product: Product;
  products: Product[] = [];
  productSnack = new ProductSnack();

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [ 'name', 'price', 'actions' ];
  dataSource;

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  /**
   * Get products
   */
  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Add product
   */
  addProduct() {
    this.router.navigate([ '/products/add' ]);
  }

  /**
   * Method remove product from db
   * @param product
   */
  removeProduct(product: Product) {
    this.productService.deleteProduct(product.id)
      .subscribe(_ => this.getProducts());
  }

  /**
   * Method redirect to edit product page
   * @param product
   */
  editProduct(product: Product) {
    this.router.navigate([ `/products/${product.id}` ]);
  }

}
