import { TestBed, inject } from '@angular/core/testing';

import { InvoiceItemService } from './invoice-item.service';

describe('InvoiceItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceItemService]
    });
  });

  it('should be created', inject([InvoiceItemService], (service: InvoiceItemService) => {
    expect(service).toBeTruthy();
  }));
});
