import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHomComponent } from './products-hom.component';

describe('ProductsHomComponent', () => {
  let component: ProductsHomComponent;
  let fixture: ComponentFixture<ProductsHomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsHomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
