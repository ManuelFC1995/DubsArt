import { Publicacion } from "./Publicacion";

export  interface Usuario{
     id?:string | number;
     name?:string;
    foto?:string;
     biografia?:string;
    publicaciones?: Publicacion[]

}

