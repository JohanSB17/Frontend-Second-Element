import { Component, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../../components/tabla/tabla.component';
import { ProductoInterface } from '../../../core/interface/producto.interface';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../services/productos/productos.service';
import { ProductoModel } from '../../../core/models/producto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PATH } from '../../../core/enum/path.enum';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  imports: [TablaComponent],
})
export class ProductosComponent implements OnInit {
  misProductos: ProductoInterface[] = [];
  productos: ProductoModel[] = [];
  productosResolver: any;

  titulo: string = 'Lista de Productos';
  columnas: string[] = [];
  informacion: ProductoModel | undefined;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.activatedRoute.data.subscribe(({ productos }) => {
      this.misProductos = productos;
      this.productos = productos;
      console.log(this.misProductos);
      console.log(productos);
    });

    this.obtenerColumnas(this.misProductos);
  }


  obtenerColumnas(productos: ProductoInterface[]) {
    if (productos?.length > 0) {
      this.columnas = Object.keys(productos[0]);
    }
  }

  recibirInformacion(data: ProductoInterface) {
    this.informacion = this.productos.find(
      (producto) => producto.sku === data.sku
    );
    console.log(data);
    console.log(this.informacion);

    if (this.informacion) {
      Swal.fire({
        title: 'Información Del Producto',
        html: `<ul>

              <lilist-style="none"> <b>SKU: </b>${this.informacion.sku}</lilist-style=><br>

              <lilist-style="none"> <b>talla: </b>${this.informacion.talla}</lilist-style=><br>

              <h>Información Vendedor</h><br>

              <lilist-style="none"> <b>Nombre Distribuidor: </b>${this.informacion.usuario?.nombre}</lilist-style=><br>

              <lilist-style="none"> <b>Email Distribuidor: </b>${this.informacion.usuario?.email}</lilist-style=><br>
            </ul>`,
        icon: 'success',
      });
    }
  }

  crearProductos() {
    this.router.navigateByUrl(`${PATH.CREAR_PRODUCTOS}`);
  }

  eliminar(data: ProductoModel) {
    this.productosService.eliminarProducto(data._id).subscribe((resp: any) => {
      Swal.fire('Producto Eliminado', `${resp.msg}`, 'success');
      this.cargarProductos();
    });
  }
}
