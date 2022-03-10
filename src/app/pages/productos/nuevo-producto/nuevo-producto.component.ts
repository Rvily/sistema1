import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';
//import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.scss']
})
export class NuevoProductoComponent implements OnInit {
  nuevoProducto: FormGroup;
  submitted = false;
  id: string | null;
  loading = false;
  titulo = 'Nuevo Producto';
  breadCrumbItems: Array<{}>;

  public Editor = ClassicEditor;

  form = new FormGroup({
    member: new FormArray([
      new FormControl(''),
    ]),
  });

  hoveredDate: NgbDate;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  hidden: boolean;
  selected: any;

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild('dp', { static: true }) datePicker: any;

  /**
   * Returns the form field value
   */
  get member(): FormArray { return this.form.get('member') as FormArray; }

  /**
   * Add the member field in form
   */
  addMember() {
    this.member.push(new FormControl());
  }

  /**
   * Onclick delete member from form
   */
  deleteMember(i: number) {
    this.member.removeAt(i);
  }

  constructor(
    private calendar: NgbCalendar,
    private fb: FormBuilder,
    private router: Router,
   // private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private productosServices:ProductosService
    )
  
  {
    this.nuevoProducto=this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      stock: ['', Validators.required],
      medida: ['', Validators.required],
      marca: ['', Validators.required],
      precioC: ['', Validators.required],
      precioV: ['', Validators.required],
      observacion: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    
   }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Create Task', active: true }];
    
    this.hidden = true;
  }

  agregarEditar(){
        
    this.submitted = true;
    
    if (this.nuevoProducto.invalid) {
      return;
    }
    
    if (this.id === null) {
      
      this.agregarProducto();
    } else {
      this.editarProducto(this.id);
    }
  }

  agregarProducto(){
    
    const producto: any = {
      codigo: this.nuevoProducto.value.codigo,
      descripcion: this.nuevoProducto.value.descripcion,
      stock: this.nuevoProducto.value.stock,
      medida: this.nuevoProducto.value.medida,
      marca: this.nuevoProducto.value.marca,
      precioC: this.nuevoProducto.value.precioC,
      precioV: this.nuevoProducto.value.precioV,
      observacion: this.nuevoProducto.value.observacion,
      
    }
    this.loading = true;
   this.productosServices.agregarProducto(producto).then(() => {
     
     this.loading = false;
     this.router.navigate(['/productos/productos']);
   }).catch(error => {
     console.log(error);
      this.loading = false;
   })
  }
  editarProducto(id: string){}



  /**
   * on date selected
   * @param date date object
   */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.selected = this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString();

      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });
      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.selected = '';
    }
  }
  /**
   * Is hovered over date
   * @param date date obj
   */
  isHovered(date: NgbDate) {
    return this.fromNGDate && !this.toNGDate && this.hoveredDate && date.after(this.fromNGDate) && date.before(this.hoveredDate);
  }

  /**
   * @param date date obj
   */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }

  /**
   * @param date date obj
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromNGDate) || date.equals(this.toNGDate) || this.isInside(date) || this.isHovered(date);
  }

}
