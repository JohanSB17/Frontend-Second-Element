import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductosService } from '../../services/productos/productos.service';
import { ProductoModel } from '../../core/models/producto.model';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';
const base_url = environment.base_url;
@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent implements OnInit{
  id: string;
  producto: ProductoModel;
  base_url=base_url;
  private productosService = inject(ProductosService);
  private router=inject(Router);
  private activatedRoute =inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.productosService.getUnProducto(this.id)
        .subscribe({
            next: (res: any) => {
              this.producto = res;
          },error: (error: any) => {
            Swal.fire('Error', 'Error al encontrar el producto', 'error');
          }})
            })
    };

}


