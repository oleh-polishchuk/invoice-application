import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from '../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: [ './customer.component.scss' ]
})
export class CustomerComponent implements OnInit {

  customerForm: FormGroup;
  customerCopy: Customer;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) {}

  ngOnInit() {
    this.customerForm = this.getFormGroup();
    this.getCustomer();
  }

  /**
   * Method return instance of customer form group
   *
   * @returns {FormGroup}
   */
  private getFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      createdAt: new FormControl(),
      updatedAt: new FormControl()
    });
  }

  getCustomer(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.getCustomer(id)
        .subscribe(customer => {
          this.customerCopy = Object.assign({}, customer);
          this.customerForm.patchValue(customer);
        });
    }
  }

  cancel() {
    this.router.navigate([ '/customers' ]);
  }

  /**
   * Method save new or update existing customer
   * @param customerForm
   */
  saveCustomer(customerForm: NgForm) {
    if (customerForm.dirty && customerForm.valid) {
      if (this.customerForm.value.id) {
        this.customerService.updateCustomer(this.customerForm.value)
          .subscribe(_ => this.router.navigate([ "/customers" ]));
      } else {
        this.customerService.saveCustomer(this.customerForm.value)
          .subscribe(_ => this.router.navigate([ "/customers" ]));
      }
    }
  }

  /**
   * Method delete customer
   */
  deleteCustomer() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.customerService.deleteCustomer(id)
      .subscribe(_ => this.router.navigate([ "/customers" ]));
  }

}
