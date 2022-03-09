import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './productos/productos.component';
import { BuysellComponent } from './buysell/buysell.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { LendingComponent } from './lending/lending.component';
import { KycapplicationComponent } from './kycapplication/kycapplication.component';
import { OrdersComponent } from './orders/orders.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';

const routes: Routes = [
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path: 'buy-sell',
        component: BuysellComponent
    },
    {
        path: 'exchange',
        component: ExchangeComponent
    },
    {
        path: 'lending',
        component: LendingComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'kyc-application',
        component: KycapplicationComponent
    },
    {
        path: 'nuevoProducto',
        component: NuevoProductoComponent
    },
    {
        path: '',
        component: ProductosComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductosRoutingModule { }