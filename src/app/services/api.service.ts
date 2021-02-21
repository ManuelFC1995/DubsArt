import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Multimedia } from '../model/Multimedia';
import { Publicacion } from '../model/Publicacion';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HTTP) { }
  /**
   * 
   * @param id is no está presenta realizará un getAll -> http://localhost:8080/Users
   * , si existe realizará una selección por ID -> http://localhost:8080/Users/id
   */
  public getUser(id?:number | string): Promise<Usuario[] | Usuario |null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUsers;
      if(id){
        endpoint+=id;
      }
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }

  public getUserId(id?:number | string): Promise< Usuario |null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUsers;
   
        endpoint+=id;
      
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }
  public getUserall(): Promise<Usuario[]  |null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiUsers;
     
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }
  /**
   * 
   * @param value el criterio de búsqueda por nombre -> http://localhost:8080/Users/search/value
   */
  public searchByName(value: string): Promise<Usuario[] | Usuario| null>  {
    return this.getUser('search/' + value);
  }


    /**
   * 
   * @param item es un número -> id, item -> item.id
   */
  public removeUser(User: any): Promise<void> {
    const id: any = User.id ? User.id : User;
    const endpoint = environment.endpoint + environment.apiUsers + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  public createUser(item: Usuario): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUsers;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }
  public updateItem(item: Usuario): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUsers;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

    /**
   * 
   * @param id is no está presenta realizará un getAll -> http://localhost:8080/Users
   * , si existe realizará una selección por ID -> http://localhost:8080/Users/id
   */
  public getPublications(id?:number | string): Promise<Publicacion[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiPublications;
      if(id){
        endpoint+=id;
      }
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }




    /**
   * 
   * @param item es un número -> id, item -> item.id
   */
  public removePublication(Publication: any): Promise<void> {
    const id: any = Publication.id ? Publication.id : Publication;
    const endpoint = environment.endpoint + environment.apiPublications + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  public createPublication(item: Publicacion): Promise<void> {
    const endpoint = environment.endpoint + environment.apiPublications;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }
  public updatePublication(item: Publicacion): Promise<void> {
    const endpoint = environment.endpoint + environment.apiPublications;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }

 







  public createMultimedia(archivo: any, id?:number): Promise<void> {
    const endpoint = environment.endpoint + environment.apiMultimediaSubir;
    return new Promise((resolve, reject) => {
      if (archivo) {
     //   this.http.setDataSerializer('json'); //send body as json, needed
     let m={
       "multipartFile":archivo,
       "publicacion":2
     }
     let headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      }
     this.http.setDataSerializer('urlencoded');
     this.http.setHeader('*', 'Content-Type', 'application/x-www-form-urlencoded');
        this.http
          .post(endpoint, m,null)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }


  private get header():any{
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
}


private get header1():any{
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'

  };
}
}
