
export class ProductoModel {
  constructor(
    public readonly _id: string,
    public imagenPath: File,
    public nombre: string,
    public sku: string,
    public precio: string,
    public talla: string,
    public descripcion:string,
    public usuario?: {
      nombre: string;
      email: string;
    },
    public createdAt?: Date,

  ) {}
}
