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
import { AppState } from "../../../store/app.state";
import { selectAuthUser } from "../../../store/reducers/auth.reducer";
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
  profForm: FormGroup;
  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.store.pipe(select(selectAuthUser), take(1)).subscribe((data) => {
      console.log("data", data);
      // this.id = data;
      //this.id = data["id"];
      //  console.log("this id", this.id);
      // this.store.dispatch(new GetUserAction({ id: this.id }));
      this.profForm = this.formBuilder.group({
        status: [null, Validators.required],
        website: ["", Validators.required],
        bio: ["", Validators.required],
        //githubusername: ["", Validators.required],
        job_location: ["", Validators.required],
        company_name: [""],
        areas_of_expertise: ["", Validators.required],
        instagram_handle: [""],
        facebook_handle: [""],
        youtube_handle: [""],
        twitter_handle: [""],
        id: data,
      });
    });
  }
}
