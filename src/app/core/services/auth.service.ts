import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { UserDetailsModel, UserCredentialsModel, UserFetch } from "../models";
import { environment } from "../../../environments/environment";
import { map, tap, catchError, first, switchMap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<UserCredentialsModel>;
  public currentUser: Observable<UserCredentialsModel>;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserCredentialsModel>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  static clearToken(): void {
    localStorage.removeItem("currentUser");
  }

  public createProfile(data): Observable<any> {
    const url = `${this.baseUrl}/api/v2/users/profile`;
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    return this.http.post(url, data, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
    });
  }

  public deleteEdu(id: number): Observable<any> {
    //DELETE /api/v2/users/profile/education/:edu_id
    // localhost:3000/api/v2/users/profile/education
    const url = `${this.baseUrl}/api/v2/users/profile/education/${id}`;
    let userdata = JSON.parse(localStorage.getItem("currentUser"));
    let token = userdata.token;
    return this.http.delete(url, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
    });
  }

  public deleteExp(id: number): Observable<any> {
    //DELETE /api/v2/users/profile/experience/:exp_id
    const url = `${this.baseUrl}/api/v2/users/profile/experience/${id}`;
    let userdata = JSON.parse(localStorage.getItem("currentUser"));
    let token = userdata.token;
    return this.http.delete(url, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
    });
  }

  login(credentials: UserCredentialsModel): Observable<any> {
    console.log("clicked service");
    const url = `${this.baseUrl}/api/v2/users/login`;
    return this.http
      .post<UserCredentialsModel>(url, credentials, this.httpOptions)
      .pipe(
        map((user) => {
          console.log("user", user);
          if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  public get currentUserValue(): UserCredentialsModel {
    return this.currentUserSubject.value;
  }

  updateProfile(profile: UserFetch) {
    console.log("update click", profile);
    const user_id = JSON.parse(sessionStorage.getItem("auth"));
    console.log("user.id", user_id["authUser"].user_profile[0].users_id);
    let users_id = user_id["authUser"].user_profile[0].users_id;

    return this.http.patch<UserFetch>(
      `${this.baseUrl}/api/v2/users/profile/${users_id}`,
      profile
    );
  }
  s;
  getUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/api/v2/users/${id}`;

    return this.http.get<any>(url, this.httpOptions);
  }

  public registerUsers(data) {
    const url = `${this.baseUrl}/api/v2/users/register`;
    //const url = `api/v2/users/register`;
    return this.http.post(url, data).pipe(map((data) => data));
  }
}
