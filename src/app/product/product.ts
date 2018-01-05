export class Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;

  quantity: number;

  constructor(product?) {
    this.id = product && product.id;
    this.name = product && product.name;
    this.price = product && product.price;
    this.createdAt = product && product.createdAt;
    this.updatedAt = product && product.updatedAt;
    this.quantity = product && product.quantity;
  }

  isValid(): boolean {
    return this.isValidName() && this.isValidPrice();
  }

  isValidName(): boolean {
    return this.name && this.name.trim().length > 0;
  }

  isValidPrice(): boolean {
    return !!this.price;
  }

  isValidToAdd(): boolean {
    return this.id && this.name && this.quantity && this.quantity > 0;
  }

}
