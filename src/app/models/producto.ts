export class producto{
_id?: number;
nombre: String;
descripcion: String;
ubicacion: String;
precio: number;

constructor(nombre: string, descripcion: string,ubicacion: string,precio: number) {

this.nombre = nombre;
this.descripcion = descripcion;
this.ubicacion = ubicacion;
this.precio = precio;

}


}