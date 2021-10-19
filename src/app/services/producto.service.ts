import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  url = 'http://localhost:4000/api/parques/';

  constructor(private http: HttpClient ) { }

  obtener(id: string): Observable <any>{
    return this.http.get(this.url + id);
  }
  getproductos(): Observable<any> {
  return this.http.get(this.url); 
  }

  eliminarproducto(id: string): Observable <any>{
    return this.http.delete(this.url + id);
  }


  guardarproducto(producto: producto): Observable<any> {
    return this.http.post(this.url,producto); 
  }

  editarproducto(id: string,producto: producto): Observable <any> {
  return this.http.put(this.url + id, producto);
  }


}


