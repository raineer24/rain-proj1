import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../store/app.state";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Subscription, Observable, of, Subject } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { login } from "../../../store/actions/auth.actions";
import { UserCredentialsModel, LoginUserDto } from "../../../core/models";
import * as SpinnerActions from "../../../store/actions/spinner.actions";
import { isLoading } from "../../../store/app.reducers";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit {
  form: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  onLogin() {
    console.log("clicked");
    const payload = {
      email: this.form.get("email").value,
      password: this.form.get("password").value,
    };
    console.log("payload", payload);
    this.store.dispatch(SpinnerActions.startSpinner());
    this.store.dispatch(login(payload));
  }
}
