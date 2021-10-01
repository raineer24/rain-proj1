import { Component, OnInit, Input } from "@angular/core";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Subscription, Observable, of, Subject } from "rxjs";
import {
  skipWhile,
  skip,
  take,
  filter,
  first,
  takeUntil,
} from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { ofType } from "@ngrx/effects";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  FormArray,
} from "@angular/forms";
//import { forEach } from "@angular/router/src/utils/collection";
import { UserFetch } from "src/app/core/models";

@Component({
  selector: "app-createprofile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.scss"],
})
export class CreateProfileComponent implements OnInit {
  ngOnInit() {}
}
