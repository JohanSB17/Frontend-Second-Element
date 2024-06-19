import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticuloComponent } from './page/articulo/articulo.component';
import { ImagenesComponent } from './page/imagenes/imagenes.component';
import { InicioComponent } from './page/inicio/inicio.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { RolDirective } from './core/directives/rol/rol.directive';
import { HeaderService } from './services/header/header.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    InicioComponent,
    ArticuloComponent,
    ImagenesComponent,
    HeaderComponent,
    FooterComponent,
    RolDirective,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  isHeaderVisible: boolean;
  private headerService= inject(HeaderService)
  ngOnInit(): void {
    this.headerService.isVisible.subscribe((visible) => {
      this.isHeaderVisible = visible;
    });
  }
  title = 'sercicle';
  nombre: string = 'johan mendoza';

}
