import { Component, Input, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: [ './customer.component.css' ]
})
export class CustomerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService) { }

  @Input()
  customer: Customer;

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }

}
