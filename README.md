# invoice-application
Invoice application makes it easy for small business owners to create professional invoices on the go, and get paid faster.

Features:
 * Create and send invoices
 * Create and send estimates
 * Convert estimates to invoices with 1-click
 * Manage Customer and Products/Services offered by your organization

# Dependencies

- sqlite3
- node
- npm

# Getting Started

###### Install npm dependencies
`yarn`

###### Run the node server
`node app.js`

###### Run the angular-cli server
`yarn start`

###### Viewing the application in your browser

[http://localhost:4200](http://localhost:4200)

# Database

To generate new ```invoices.db``` use next command:

    sqlite3 invoices.db
    sqlite> .databeses

The result should be like that:

    main: /Users/olehpolishchuk/workspace/invoice-application/invoice.db

Great! That mean you successfully generate new db file.

# Schema

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)

## Invoices

- id (integer)
- customer_id (integer)
- discount (decimal)
- total (decimal)

## InvoiceItems

- id (integer)
- invoice_id (integer)
- product_id (integer)
- quantity (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
## Invoices
```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems
```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```

# WebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

