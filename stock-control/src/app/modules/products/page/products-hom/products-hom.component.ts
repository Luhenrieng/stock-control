import { MessageService } from 'primeng/api';
import { GetAllProductsResponse } from './../../../../models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products-hom',
  templateUrl: './products-hom.component.html',
  styleUrls: [],
})
export class ProductsHomComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productsData: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsData();
  }

  getServiceProductsData(): void {
    const productsLoaded = this.productsDtService.getProductsData();

    if (productsLoaded.length > 0) {
      this.productsData = productsLoaded;
    } else {
      this.getAPIProductsData();
    }
  }

  getAPIProductsData() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsData = response;
            console.log('DADOS DE PRODUTOS', this.productsData);
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar Produtos',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
