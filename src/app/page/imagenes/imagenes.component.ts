import { Component, inject, OnInit } from '@angular/core';
import { ProductoInterface } from '../../core/interface/producto.interface';
import { ProductoModel } from '../../core/models/producto.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';
import { environment } from '../../../environments/environment.development';
import Swal from 'sweetalert2';
import { PATH } from '../../core/enum/path.enum';
const base_url = environment.base_url;
@Component({
  selector: 'app-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagenes.component.html',
  styleUrl: './imagenes.component.css'
})

export class ImagenesComponent implements OnInit {
  misProductos: ProductoInterface[] = [];
  productos: ProductoModel[] = [];
  productoSeleccionado: ProductoModel[] = [];
  base_url=base_url;
  productosResolver: any;


  private productosService = inject(ProductosService);
  private router=inject(Router)

  ngOnInit(): void {
    this.cargarUsuario();
  }


  cargarUsuario() {
    this.productosService.getProductos().subscribe({
    next: (res: any) => {
      this.productos=res;
    },
    error: (error) => {
      Swal.fire('Error', `${error.error.msg}`, 'error');
    },
  });
}
selectedCard(id: string) {
  this.router.navigate([`${PATH.ARTICULO}`, id])

}
}
