import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIModule } from '../../shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbNavModule, NgbModalModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SimplebarAngularModule } from 'simplebar-angular';

import { ProductosRoutingModule } from './productos-routing.module';

import { ProductosComponent } from './productos/productos.component';
import { BuysellComponent } from './buysell/buysell.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { LendingComponent } from './lending/lending.component';
import { KycapplicationComponent } from './kycapplication/kycapplication.component';

import { ProductosSortableService } from './productos/productos-sortable.directive';
import { OrderSortableService } from './orders/orders-sortable.directive'

import { OrdersComponent } from './orders/orders.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';


@NgModule({
  declarations: [ProductosComponent, BuysellComponent, ExchangeComponent, LendingComponent, KycapplicationComponent, ProductosSortableService, OrdersComponent, OrderSortableService, NuevoProductoComponent],
  imports: [
    CommonModule,
    UIModule,
    ProductosRoutingModule,
    NgbDropdownModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbNavModule,
    NgbModalModule,
    NgbDatepickerModule,
    ArchwizardModule,
    DropzoneModule,
    SimplebarAngularModule
  ]
})
export class CryptoModule { }
