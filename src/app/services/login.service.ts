import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap} from 'rxjs/operators';

export class User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
	
  	constructor(private http: HttpClient) { }

  	httpHeader = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Access-Control-Allow-Origin': '*'}),
	}

	private handleError<T>(operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {
	      console.error(error);
	      console.log(`${operation} failed: ${error.message}`);
	      return of(result as T);
	    };
	}

	tryLogin(user: User): Observable<any> {
	  return this.http.post<User>('http://127.0.0.1:8000/api/login', user, this.httpHeader)
	    .pipe(
	       catchError(this.handleError<User>('Unable to login'))
	    );
	}

}
