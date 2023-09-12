import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';


const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {

  apiKey: string;

  constructor(private http: HttpClient) { 
    this.apiKey = 'a1cnPYYvPlOtIE1NoooqEV8KJ4BIPhQlCg9QaNDn';

  }

  
 searchFood(requirnments,pageNum): Observable<any> {
  console.log(requirnments);

  let testurl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${requirnments.query}`;
  if(requirnments.dataType!=null){
    testurl = testurl + `&dataType=${requirnments.dataType}`;
  };
  testurl = testurl + `&pageSize=10&pageNumber=${pageNum}`;
  if(requirnments.sortBy!=null){
    testurl = testurl + `&sortBy=${requirnments.sortBy}`;
  }
  if(requirnments.sort!=null){
    testurl = testurl + `&sortOrder=${requirnments.sort}`;
  }
  if(requirnments.brand!=null){
    testurl = testurl + `&brandOwner=${requirnments.brand}`;
  }
  testurl = testurl + `&api_key=eZv9DGEhCKT7mFbgAoEEsqeuhb0vrd96xzbyTOgV`
  return this.http.get<any>(testurl)
  .pipe(
    tap((_) => console.log('Food Data Fetched successfully')),
    catchError(this.handleError<[]>('Error Fetcing data', []))
  );
}
  getFoodById(list:any): Observable<any>{
    let testurl = `https://api.nal.usda.gov/fdc/v1/foods?`;
    list.forEach(function (value) {
      testurl = testurl + `fdcIds=${value}&`
    }); 
    testurl = testurl + `api_key=eZv9DGEhCKT7mFbgAoEEsqeuhb0vrd96xzbyTOgV`
    return this.http.get<any>(testurl)
    .pipe(
      tap((_) => console.log('Food Data Fetched successfully')),
      catchError(this.handleError<[]>('Error Fetcing data', []))
    );
  }

   
  addToFavorites(data: any): Observable<any> {
    data.userId = UserStorageService.getUserId();
    return this.http
      .post<[]>(BASIC_URL+"api/favorites",data,{
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Favorites Added successfully')),
        catchError(this.handleError<[]>('Error Posting New Favorite', []))
      );
  }

  getAllByUser(): Observable<any> {
    const userId = UserStorageService.getUserId();
    return this.http
      .get<[]>(BASIC_URL+`api/favorites/${userId}`,{
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Favorites Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Favorites', []))
      );
  }

  deleteFavourite(fdcId): Observable<any> {
    return this.http
      .delete<[]>(BASIC_URL+`api/favorites/${fdcId}`,{
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Favorites Deleted successfully')),
        catchError(this.handleError<[]>('Error Deleting Favorites', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }
}
