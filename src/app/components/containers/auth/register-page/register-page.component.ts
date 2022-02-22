import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AppState } from "../../../../store/app.reducers";
import { Store } from "@ngrx/store";
//import { RegisterUser } from "../../../../store/actions/auth.actions";
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
  formCheck: any = "";
  form: FormGroup;

  ngOnInit(): void {}

  onRegister(event) {
    // this.formCheck = event;
    //console.log(event, this.formCheck["controls"]);
    console.log(event);
  }
}
