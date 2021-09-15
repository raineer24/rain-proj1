import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetailsModel, UserCredentialsModel } from "../models";
import { environment } from "../../../environments/environment";
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
}
