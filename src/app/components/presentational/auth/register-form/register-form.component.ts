import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AppState } from "../../../../store/app.state";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  public form: FormGroup;
  @Output() register: EventEmitter<void> = new EventEmitter<void>();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

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

  save() {
    //  this.isSubmited = true;
    if (this.form.valid) {
      this.register.emit(this.form.value);
    }
  }
}
