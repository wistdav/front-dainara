import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoform: FormGroup; 
  titulo =' crear parque';
  id: string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productoservice: ProductoService,
    private arouter: ActivatedRoute) { 
    this.productoform = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],    
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],   

    })
    this.id = this.arouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.consultar();
  }

  agregarparques(){

    const Producto: producto ={
      nombre: this.productoform.get('nombre')?.value,
      descripcion: this.productoform.get('descripcion')?.value,
      ubicacion: this.productoform.get('ubicacion')?.value,
      precio: this.productoform.get('precio')?.value,
    }
    if(this.id !== null){
      //console.log(this.id);
      this.productoservice.editarproducto(this.id,Producto).subscribe(respuesta => {
        this.toastr.success('Se modifico el parque');
        this.router.navigate(['/']);  
      },error =>{
        this.toastr.warning('No se modifico el parque');
      }
      );
    }else{
      this.productoservice.guardarproducto(Producto).subscribe(respuesta =>{
        this.toastr.success('Se inserto el parque');
        this.router.navigate(['/']);
      },error =>{
        this.toastr.warning('No se pudo insertar el parque');
        this.productoform.reset();
      }
      );
    }

  } 
  consultar(){
    if(this.id !== null){
      this.titulo ='EDITAR PARQUE';
      this.productoservice.obtener(this.id).subscribe(respuesta =>{
        this.productoform.setValue({
          nombre: respuesta.nombre,
          descripcion: respuesta.descripcion,
          ubicacion: respuesta.ubicacion,
          precio: respuesta.precio,    
        })
      },error =>{
        this.toastr.warning('No se encontro el parque');
      }
      )

    }

  }

    
}

