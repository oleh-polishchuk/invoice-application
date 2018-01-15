import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../services/customer.service';
import { MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: [ './customers.component.scss' ]
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  displayedColumns = [ 'name', 'address', 'phone', 'actions' ];
  dataSource;

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit() {
    this.getCustomers();
  }

  /**
   * Method fetch customers from db
   */
  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = this.orderBy(customers, 'id', 'desc');
        this.dataSource = new MatTableDataSource(this.customers);
      });
  }

  /**
   * Add customer
   */
  addCustomer() {
    this.router.navigate([ '/customers/add' ]);
  }

  // TODO Polishchuk: use generic and move into shared service
  // TODO Polishchuk: use sort from build in matSort
  orderBy(products: Customer[], fieldName: string, order: string): Customer[] {
    return products.sort((a: Customer, b: Customer) => {
      if (order === 'asc') {
        return a[ fieldName ] - b[ fieldName ];
      } else {
        return b[ fieldName ] - a[ fieldName ];
      }
    });
  }

}
