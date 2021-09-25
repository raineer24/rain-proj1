import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
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
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  fd = new FormData();
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  form: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailPattern),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      username: ["", Validators.required],
      first_name: ["", Validators.required],
      image: [null, Validators.required],
      password2: [null, Validators.required],
    });
  }

  onRegister() {
    console.log("this.form.value", this.form.value);

    this.fd.append("email", this.form.value.email);
    this.fd.append("password", this.form.value.password);
    this.fd.append("username", this.form.value.username);
    this.fd.append("first_name", this.form.value.first_name);
    this.fd.append("password2", this.form.value.password2);

    this.store.dispatch(new RegisterUser(this.fd));
  }
}
