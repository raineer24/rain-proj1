import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppState } from "../../../../store/app.state";
import { Store } from "@ngrx/store";
import { RegisterUser } from "../../../../store/actions/auth.actions";
import { UserCredentialsModel } from "../../../../core/models/users/user-credentials.model";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  ngOnInit(): void {}

  onRegister() {}
}
