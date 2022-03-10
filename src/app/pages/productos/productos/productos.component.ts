import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { ProductosService } from '../productos.service';
import { ProductosSortableService, SortEvent } from './productos-sortable.directive';

import { ChartType, Activities } from './productos.model';

import { OveviewChart, activitiesData } from './productos';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  
  providers: [ProductosService, DecimalPipe]
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  // breadcrumb items
  breadCrumbItems: Array<{}>;
  OveviewChart: ChartType;

  activitiesData: Activities[];

  activities$: Observable<Activities[]>;
  total$: Observable<number>;

  @ViewChildren(ProductosSortableService) headers: QueryList<ProductosSortableService>;

  constructor(public service: ProductosService) {
    //this.activities$ = service.activities$;
    //this.total$ = service.total$;
  }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Crypto' }, { label: 'Wallets', active: true }];

    this.OveviewChart = OveviewChart;
    this.activitiesData = activitiesData;
    this.getProductos()
  }
  getProductos() {
    
    this.service.getProductos().subscribe(data => {
      
      
      this.productos = [];
      
      data.forEach((elements: any) => {
         
        this.productos.push({
          id: elements.payload.doc.id,
          ...elements.payload.doc.data()
        })
         
               
      });
     //console.log('rv:',this.productos)
    });
  }
  /**
 * Sort table data
 * @param param0 sort the column
 *
 */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
   // this.service.sortColumn = column;
   // this.service.sortDirection = direction;
  }
}
