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
// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
// } from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
//import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { Router, ActivatedRoute } from "@angular/router";
//import { default as _rollupMoment } from "moment";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-add-exp",
  templateUrl: "./add-exp.component.html",
  styleUrls: ["./add-exp.component.scss"],
})
export class AddExperienceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
