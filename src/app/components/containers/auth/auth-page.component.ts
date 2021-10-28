import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../store/app.state";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { login } from "../../../store/actions/auth.actions";
import { UserCredentialsModel, LoginUserDto } from "../../../core/models";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  onLogin() {
    console.log("clicked");
    const payload = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
    };
    console.log("payload", payload);
    this.store.dispatch(login(payload));
  }
}
