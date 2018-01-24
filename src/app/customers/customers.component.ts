import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../services/customer.service';
import { MatSort, MatTableDataSource, Sort } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: [ './customers.component.scss' ]
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = [ 'name', 'address', 'phone', 'date', 'actions' ];
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
        this.customers = customers;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Add customer
   */
  addCustomer() {
    this.router.navigate([ '/customers/add' ]);
  }

  /**
   * Method remove customer from db
   * @param customer
   */
  removeCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer.id)
      .subscribe(_ => this.getCustomers());
  }

  /**
   * Method redirect to edit customer page
   * @param customer
   */
  editCustomer(customer: Customer) {
    this.router.navigate([ `/customers/${customer.id}` ]);
  }

}
