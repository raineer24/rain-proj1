import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../store/app.state";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }
}
