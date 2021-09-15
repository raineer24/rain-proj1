import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetailsModel } from "../models/users/user-details.model";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {}
