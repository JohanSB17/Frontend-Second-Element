import { PATH } from '../core/enum/path.enum';
import { MenuInfoInterface } from '../core/interface/menu_info.interface';

export const MenuRoutes: MenuInfoInterface[] = [
  {
    path: PATH.HOME,
    title: 'Home',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {
    path: PATH.USUARIO,
    title: 'Ver Usuarios',
    icon: '',
    classCss: '',
    subMenu: [],
  },
  {

    path: PATH.IMAGEN,
    title: 'Catálogo',
    icon: '',
    classCss: '',
    subMenu: [
    {
      path: PATH.CREAR_PRODUCTOS,
      title: 'Vende Tu Ropa',
      icon: '',
      classCss: '',
      subMenu: [],
    },{
      path: PATH.PRODUCTOS,
      title: 'Ver Productos',
      icon: '',
      classCss: '',
      subMenu:[]
    }
    ],
  },
  {
    path: PATH.CONTACTO,
    title: 'Contacto',
    icon: '',
    classCss: '',
    subMenu: [],
  },

];
