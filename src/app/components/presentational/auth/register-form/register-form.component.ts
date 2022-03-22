import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AppState } from "../../../../store/app.reducers";
import { register } from "../../../../store/actions/auth.actions";
import { Store, select } from "@ngrx/store";
import * as SpinnerActions from "../../../../store/actions/spinner.actions";
import { isLoading } from "../../../../store/app.reducers";
import { Subscription, Observable, of, Subject } from "rxjs";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnInit {
  size = false;
  selectedFile: string | Blob;
  defaultImage = "https://www.w3schools.com/howto/img_avatar.png";
  isLoading$: Observable<boolean>;
  public form: FormGroup;
  @Output() register: EventEmitter<void> = new EventEmitter<void>();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  myFile: File;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}
  fd = new FormData();
  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(isLoading));
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

    this.fd.append("image", this.selectedFile);
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
    this.store.dispatch(SpinnerActions.startSpinner());
  }

  onChange(event) {
    if (event.target !== undefined) {
      console.log("event", event.target.files[0]);
      this.myFile = event.target.files[0];
      console.log("file", this.myFile);
    }
  }

  fileInputChange(event) {
    this.defaultImage = event.target.files[0];
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.defaultImage = event.target.result;
    };
    console.log(event.target.files[0]);
    if (event.target.files[0].size >= 5000000) {
      this.size = true;
      console.log(this.size);
      this.form.controls.image.setErrors({ valid: false });
    } else {
      this.size = false;
      console.log(this.size);

      this.form.controls.image.setErrors({ valid: true });
      this.form.controls.image.setValue(event.target.files[0].name);
    }
  }
}
