import { Component, OnInit } from '@angular/core';
import { producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listproductos: producto[] = [];
  constructor(private _productoservice: ProductoService) { }
  

  ngOnInit(): void {
    this.obtenerproductos();
    }

  obtenerproductos(): void  {
    this._productoservice.getproductos().subscribe(data =>{
      console.log(data);
      this.listproductos =data;
    }, error => {
      console.log(error);
        }
      )
  }

  eliminarproducto(id: any){
    this._productoservice.eliminarproducto(id).subscribe(
      respuesta=> {
        alert('Eliminado');
        this.obtenerproductos();
        
      },error => {
        console.log(error);
      }
    );
  }




}
