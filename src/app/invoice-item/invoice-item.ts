export class InvoiceItem {

  id: number;
  invoice_id: number;
  product_id: number;
  quantity: number;

  constructor(invoice_id?: number, product_id?: number, quantity?: number) {
    this.invoice_id = invoice_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }

  isValidToSave() {
    return this.invoice_id && this.product_id && this.quantity && this.quantity > 0;
  }

}
