import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AppState } from "../../../../store/app.state";
import { register } from "../../../../store/actions/auth.actions";
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
  myFile: File;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}
  fd = new FormData();
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

    this.fd.append("image", this.myFile);
    this.fd.append("email", this.form.value.email);
    this.fd.append("password", this.form.value.password);
    this.fd.append("username", this.form.value.username);
    this.fd.append("first_name", this.form.value.first_name);
    this.fd.append("password2", this.form.value.password2);
    console.log("fd email", this.fd.get("email"));
    console.log("fd username", this.fd.get("username"));

    // console.log("form.value", this.form.value);

    const payload = this.fd;

    this.store.dispatch(register({ payload }));
  }

  onChange(event) {
    if (event.target !== undefined) {
      console.log("event", event.target.files[0]);
      this.myFile = event.target.files[0];
      console.log("file", this.myFile);
    }
  }
}
