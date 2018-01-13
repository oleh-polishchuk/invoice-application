import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: [ './customers.component.scss' ]
})
export class CustomersComponent implements OnInit {

  customers: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

}
