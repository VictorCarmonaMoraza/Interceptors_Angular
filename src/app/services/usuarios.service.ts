import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {

    //Parametros de la ruta url
    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Victor Carmona');

    //Mandar un token por header
    const headers = new HttpHeaders({
      'token-usuario': 'ABC12348457845975'
    })

    return this.http.get('https://reqres.in/api/user', {
      params,
      headers
    }).pipe(

        map(resp => resp['data'] ),
          //Devuelve la propiedad del objeto
        catchError(this.manejarError)
    );
  }

  manejarError(error:HttpErrorResponse){
    console.log('sucedio un error');
          console.log('Registrado en el log file');
          console.warn(error);
          return throwError('Error personalizado');
  }
}
