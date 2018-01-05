import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSnackComponent } from './product-snack.component';

describe('ProductSnackComponent', () => {
  let component: ProductSnackComponent;
  let fixture: ComponentFixture<ProductSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
