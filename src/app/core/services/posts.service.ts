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
  Posts,
} from "../models";
import { AppState } from "../../store/app.reducers";
import { environment } from "../../../environments/environment";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { map, tap, catchError, first, switchMap } from "rxjs/operators";
import * as PostsActions from "../../store/actions/post.actions";
import * as ErrorActions from "../../store/actions/http-errors.actions";
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
  constructor(private http: HttpClient, private store: Store<AppState>) {}

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

  public createPost(data) {
    console.log("triggered!");
    const url = `${this.baseUrl}/api/v2/posts`;
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    return this.http.post(url, data, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
    });
  }

  PostsAll(): Observable<Posts[]> {
    return this.http.get<Posts[]>(`${this.baseUrl}/api/v2/posts`).pipe(
      tap((devices) => {
        this.store.dispatch(PostsActions.getPostSuccess({ post: devices }));
      }),
      catchError((error) => {
        this.store.dispatch(new ErrorActions.SetError(error));
        return Observable.throw(error);
      })
    );
  }

  // findAll(): Observable<Device[]> {
  //   return this.httpClient
  //     .get<Device[]>(`${environment.zeusServerDeviceApiBaseUri}/devices`)
  //     .pipe(
  //       tap((devices) => {
  //         this.store.dispatch(
  //           DeviceApiActions.loadedAllSuccessfully({ devices: devices })
  //         );
  //       }),
  //       catchError(() => {
  //         this.store.dispatch(DeviceApiActions.unexpectedError());
  //         return EMPTY;
  //       })
  //     );
  // }

  getPosts() {
    const url = `${this.baseUrl}/api/v2/posts`;
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    console.log(url);
    return this.http
      .get<Posts[]>(url, {
        headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
      })
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        })
      );
  }
}
