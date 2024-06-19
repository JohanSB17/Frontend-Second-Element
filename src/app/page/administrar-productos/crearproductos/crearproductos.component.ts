import { ProductosService } from './../../../services/productos/productos.service';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  crearProductoInterface,
  ProductoInterface,
} from '../../../core/interface/producto.interface';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { PATH } from '../../../core/enum/path.enum';
import { ProductoModel } from '../../../core/models/producto.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';





@Component({
  selector: 'app-crearproductos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crearproductos.component.html',
  styleUrl: './crearproductos.component.css',
})
export class CrearproductosComponent implements OnInit {
  productoForm: FormGroup;
  productoSubscription: Subscription;
  productoSeleccionado: ProductoModel;
  photoSelected: string | ArrayBuffer;
  file: File;
  target: HTMLInputElement & EventTarget;
  private formBuilder = inject(FormBuilder);
  private productosService = inject(ProductosService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombre: ['', []],
      sku: ['', []],
      precio: ['', []],
      talla: ['', []],
      descripcion: ['', []],
    });

  }
  onPhotoSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.files && target.files[0]) {
      this.file = <File>target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => {
        if (reader.result) {
          this.photoSelected = reader.result;
        }
      };
      reader.readAsDataURL(this.file);
    }
  }

  buscarUsuario(numeroDocumento: string) {
    if (numeroDocumento !== 'nuevo') {
      this.productosService.getUnProducto(numeroDocumento).subscribe({
        next: (res: any) => {

          this.productoSeleccionado = res.data;

          Swal.fire(
            'Usuario',
            `Se encontró el usuario ${res.producto.nombre}`,
            'info'
          );

          this.productoForm.setValue({
            nombre: res.usuario.nombre,
            email:res.usuario.email,
            tipoDocumento: res.usuario.tipoDocumento,
            numeroDocumento: res.usuario.numeroDocumento,
            rol:res.usuario.rol,
            peso: res.usuario.peso,
            fechaNacimiento: res.usuario.fechaNacimiento,
            password: res.usuario.password,
          });
        },

        error: (error: any) => {
          Swal.fire('Error', 'Error al encontrar el usuario', 'error');
        },
      });
    }
  }
  crearProducto() {
    if (!this.productoForm.valid) {
      Swal.fire('Crear producto', 'Por favor complete el formulario', 'info');
      return;
    }
    const data = this.productoForm.value;
    const nuevoProducto: crearProductoInterface = {
      imagenPath: this.file,
      nombre: data.nombre,
      sku: data.sku,
      precio: data.precio,
      talla: data.talla,
      descripcion: data.descripcion,
    }

    this.productosService.crearProductos(nuevoProducto).subscribe({
      next: (res: any) => {
        Swal.fire(
          'EN VENTA!',
          `El producto ${data.nombre} esta ahora en oferta`,
          'success'
        );
        this.resetFormulario()
        this.router.navigateByUrl(`${PATH.IMAGEN}`);
      },
      error: (error) => {
        console.log(nuevoProducto)
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },
    });
  }


  actualizarProducto(producto: crearProductoInterface) {
    const productosActualizar: ProductoModel = {
      _id: this.productoSeleccionado._id,
      imagenPath: producto.imagenPath,
      nombre: producto.nombre,
      sku: producto.sku,
      precio: producto.precio,
      talla: producto.talla,
      descripcion: producto.descripcion,

    };

    this.productosService.actualizarProducto(productosActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Usaurio Actualizado',
          `El PRODUCTO ${this.productoSeleccionado.nombre} ha sido actualizado con éxito`,
          'success'
        );
        this.router.navigateByUrl(PATH.USUARIO);
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.msg}`, 'error');
      },
    });
  }
  resetFormulario() {
    this.productoForm.reset();
  }
}
