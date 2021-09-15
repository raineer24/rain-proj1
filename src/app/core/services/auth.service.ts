import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetailsModel, UserCredentialsModel } from "../models";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}
  login(credentials: UserCredentialsModel): Observable<{}> {
    return this.http.post("api/login", credentials, this.httpOptions);
  }
}
