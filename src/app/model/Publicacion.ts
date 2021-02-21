import { Multimedia } from "./Multimedia";
import { Usuario } from "./Usuario";

export interface Publicacion{
    id?:string | number,
    descripcion?:string,
    id_usuario?:string | number,
    usuario?:Usuario,
    multimedia?:Multimedia,
imagen?:string
}