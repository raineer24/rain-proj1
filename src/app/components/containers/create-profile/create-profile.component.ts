import { Component, OnInit, Input } from "@angular/core";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Subscription, Observable, of, Subject } from "rxjs";
import { MatIconRegistry } from "@angular/material/icon";

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
import { selectAuthUserId } from "../../../store/reducers/auth.reducer";
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
  isAddMode: boolean;
  id: string;
  profForm: FormGroup;
  @Input() disableForm: boolean;
  dropdownSelected: string;
  selectedStatus: String = "";

  show = false;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "thumbs-up",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/img/twitter-black-shape.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "inst",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/instagram.svg")
    );
    iconRegistry.addSvgIcon(
      "utube",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/youtube.svg")
    );
    iconRegistry.addSvgIcon(
      "fb",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/facebook.svg")
    );
  }
  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;
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
      //id: data,
    });
    this.store.pipe(select(selectAuthUserId), take(1)).subscribe((data) => {
      console.log("data", data);
      // this.id = data;
      //this.id = data["id"];
      //  console.log("this id", this.id);
      // this.store.dispatch(new GetUserAction({ id: this.id }));
    });
  }
  get status() {
    return this.profForm.get("status");
  }

  onFormSubmit() {}

  setJob(value) {
    this.selectedStatus = value;
    let val = this.profForm.get("status").setValue(value);
    console.log("positions.value", this.status.value);
    console.log("val", val);

    if (value === "Other") {
      this.profForm.get("status").reset();
    }
  }
}
