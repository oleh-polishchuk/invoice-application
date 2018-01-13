import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { map, startWith } from "rxjs/operators";
import "rxjs/add/observable/forkJoin";
import { Customer } from "../customer/customer";
import { SimpleTableConfig } from "../entities/simple-table-config";
import { Product } from "../product/product";
import { CustomerService } from "../services/customer.service";
import { InvoiceService } from "../services/invoice.service";
import { ProductService } from "../services/product.service";
import { SimpleTableService } from "../services/simple-table.service";
import { Invoice } from "./invoice";
import { InvoiceItemService } from "../services/invoice-item.service";
import { InvoiceItem } from "../invoice-item/invoice-item";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: [ './invoice.component.scss' ]
})
export class InvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice();
  invoiceItems: InvoiceItem[] = [];

  customers: Customer[] = [];
  customerCtrl: FormControl;
  filteredCustomers: Observable<any[]>;

  products: Product[] = [];
  productCtrl: FormControl;
  filteredProducts: Observable<any[]>;
  addedProduct: Product = new Product();
  addedProducts: Product[] = [];

  productTableConfig: SimpleTableConfig;

  private invoiceForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private productService: ProductService,
              private simpleTableService: SimpleTableService,
              private invoiceService: InvoiceService,
              private invoiceItemService: InvoiceItemService) {

    this.invoice = new Invoice();

    this.customerCtrl = new FormControl();
    this.filteredCustomers = this.customerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(customer => customer ? this.filterCustomers(customer) : this.customers.slice())
      );

    this.productCtrl = new FormControl();
    this.filteredProducts = this.productCtrl.valueChanges
      .pipe(
        startWith(''),
        map((product) => product ? this.filterProducts(product) : this.products.slice())
      );
  }

  ngOnInit() {
    // TODO Polishchuk: should be removed
    this.simpleTableService.initConfig({ remove: true });
    this.productTableConfig = this.simpleTableService.getConfig();

    const response = Observable.forkJoin(
      this.customerService.getCustomers(),
      this.productService.getProducts()
    );

    response.subscribe(res => {
      this.customers = res[ 0 ];
      this.customerCtrl.setValue('');

      this.products = res[ 1 ];
      this.productCtrl.setValue('');

      const id = +this.route.snapshot.paramMap.get('id');
      if (id) {
        const response = Observable.forkJoin(
          this.invoiceService.getInvoice(id),
          this.invoiceItemService.getInvoiceItems(id)
        );

        response.subscribe(res => {
          this.invoice = res[ 0 ];
          this.customerCtrl.setValue(this.getCustomerById(this.invoice.customer_id));
          this.invoiceItems = res[ 1 ];
          this.restoreAddedProducts();
        });
      }
    });

    this.invoiceForm = new FormGroup({
      'customer': new FormControl(),
      'discount': new FormControl(),
      'products': new FormGroup({
        'product': new FormControl(),
        'quantity': new FormControl()
      })
    });
  }

  register(invoiceForm: NgForm) {
    console.log('Registration successful.');
    console.log(invoiceForm.value);
  }

  restoreAddedProducts(): void {
    this.invoiceItems.forEach(invoiceItem => {
      const product = this.products.find(product => product.id === invoiceItem.product_id);
      this.addedProducts.push(product);
    });
  }

  getCustomers() {
    this.customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
        this.customerCtrl.setValue('');
      });
  }

  filterCustomers(selectedCustomer) {
    return this.customers.filter(customer =>
      customer.name.toLocaleLowerCase().indexOf(selectedCustomer.name.toLocaleLowerCase()) === 0
    );
  }

  customerSelected(event) {
    this.invoice.customer_id = event.option.value.id;
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.productCtrl.setValue('');
      });
  }

  filterProducts(selectedProduct) {
    const productName = selectedProduct.name ? selectedProduct.name : selectedProduct;
    return this.products.filter(product =>
      product.name.toLocaleLowerCase().indexOf(productName.toLocaleLowerCase()) === 0
    );
  }

  /**
   * Method create new product and set product quantity as 1 by default
   *
   * @param event
   */
  productSelected(event) {
    this.addedProduct = new Product(event.option.value);
    this.addedProduct.quantity = 1;
  }

  getCustomerById(id: number) {
    return this.customers.find(customer => customer.id === id);
  }

  /**
   * Method show name of selected option object
   *
   * @param option
   * @returns {string}
   */
  displayWithName(option) {
    return option ? option.name : '';
  }

  addProduct(addedProduct: Product) {
    if (addedProduct && addedProduct.isValidToAdd()) {
      this.addedProducts.push(addedProduct);
      this.addedProduct = new Product();
      this.productCtrl.reset();
      this.calculateInvoice();
    }
  }

  calculateInvoice() {
    this.invoice.discount = this.invoice.discount || 0;

    let totalProductCost = 0;
    this.addedProducts.forEach(addedProduct => {
      totalProductCost += addedProduct.price * addedProduct.quantity;
    });
    let discountAmount = totalProductCost / 100 * this.invoice.discount;
    this.invoice.total = +(totalProductCost - discountAmount).toFixed(2);
  }

  updateAddedProducts(addedProducts: Product[]) {
    this.addedProducts = addedProducts;
    this.calculateInvoice();
  }

  cancel(): void {
    this.router.navigate([ '/invoices' ]);
  }

  /**
   * Method save new invoice and redirect to invoices page
   */
  saveInvoice(): void {
    if (this.invoice && this.invoice.isValidToSave()) {
      this.invoiceService.saveInvoice(this.invoice)
        .subscribe(invoice => this.saveInvoiceItems(invoice));
      this.router.navigate([ '/invoices' ]);
    }
  }

  /**
   * Method create and save invoice item for each product added into invoice
   *
   * @param invoice
   */
  private saveInvoiceItems(invoice) {
    this.addedProducts.forEach(addedProduct => {
      const invoiceItem = new InvoiceItem(invoice.id, addedProduct.id, addedProduct.quantity);
      this.saveInvoiceItem(invoiceItem);
    });
  }

  /**
   * Method save new invoice item
   *
   * @param invoiceItem
   */
  private saveInvoiceItem(invoiceItem: InvoiceItem) {
    if (invoiceItem && invoiceItem.isValidToSave()) {
      this.invoiceItemService.saveInvoiceItem(invoiceItem)
        .subscribe();
    }
  }

}
