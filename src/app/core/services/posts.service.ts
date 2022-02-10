import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import {
  UserDetailsModel,
  UserCredentialsModel,
  UserFetch,
  LoginUserQuery,
} from "../models";
import { environment } from "../../../environments/environment";
import { map, tap, catchError, first, switchMap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class PostsService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<UserCredentialsModel>;
  public currentUser: Observable<UserCredentialsModel>;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  // error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    console.log("error", error);

    if (error.error instanceof ErrorEvent) {
      // get client-side error
      errorMessage = error.error.message;
    } else {
      // get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  public createPost(data): Observable<any> {
    const url = `${this.baseUrl}/api/v2/posts`;
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    return this.http.post(url, data, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
    });
  }
}
