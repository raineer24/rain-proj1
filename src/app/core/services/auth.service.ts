import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetailsModel, UserCredentialsModel } from "../models";
import { environment } from "../../../environments/environment";
import { map, tap, catchError, first, switchMap } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}
  login(credentials: UserCredentialsModel): Observable<{}> {
    console.log("clicked service");
    const url = `${this.baseUrl}/api/v2/users/login`;
    return this.http.post(url, credentials, this.httpOptions);
  }

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
