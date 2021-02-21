import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../model/Usuario';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(UsuariosFiltrados: Usuario[], texto:string): Usuario[] {

    if(texto===''){
      return UsuariosFiltrados;
    }

texto=texto.toLowerCase();
 return UsuariosFiltrados.filter(u=>{
return u.name.toLowerCase().includes(texto);
 });
  }

}
