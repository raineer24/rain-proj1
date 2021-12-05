import { Component, OnInit } from "@angular/core";
//import { User } from "../../../core/models/user";
//import { AuthService } from "../../../core/services/user.service";
import { Store, select } from "@ngrx/store";
//import * as fromUser from "../../state/user.reducer";
//import * as userActions from "../../state/user.actions";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormArray,
} from "@angular/forms";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { Router, ActivatedRoute } from "@angular/router";
import { default as _rollupMoment } from "moment";
import { DatePipe } from "@angular/common";

const moment = _rollupMoment || _moment;

@Component({
  selector: "app-add-exp",
  templateUrl: "./add-exp.component.html",
  styleUrls: ["./add-exp.component.scss"],
})
export class AddExperienceComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      job_title: [null, Validators.required],
      company_name: [null, Validators.required],
      job_location: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      description: [null, Validators.required],
      current: [false, []],
    });
  }
}
