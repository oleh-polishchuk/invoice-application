import { Customer } from '../customer/customer';
export class Invoice {

  id: number;
  customer_id: number;
  customer?: Customer;
  discount = 0;
  total = 0;

  isValidToSave() {
    return this.customer_id && this.total && this.total > 0;
  }

}
