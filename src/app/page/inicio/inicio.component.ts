import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  constructor(private router: Router) {}

  cambioArticulo() {
    this.router.navigateByUrl('/articulo');
  }
  cambioInicio() {
    this.router.navigateByUrl('/');
  }
}
