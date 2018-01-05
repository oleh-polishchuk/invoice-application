import { TestBed, inject } from '@angular/core/testing';

import { SimpleTableService } from './simple-table.service';

describe('SimpleTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleTableService]
    });
  });

  it('should be created', inject([SimpleTableService], (service: SimpleTableService) => {
    expect(service).toBeTruthy();
  }));
});
