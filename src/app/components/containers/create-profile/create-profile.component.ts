import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Subscription, Observable, of, Subject } from "rxjs";
import { MatIconRegistry } from "@angular/material/icon";
import { GetUserAction } from "../../../store/actions/auth.actions";
import * as AuthActions from "../../../store/actions/auth.actions";

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
import {
  selectAuthUserId,
  selectAuthUser,
  selectAuthUserProfile,
} from "../../../store/reducers/auth.reducer";
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
  profile$: UserFetch;
  isAddMode: boolean;
  id: string;
  dataId: string;
  profForm: FormGroup;
  @Input() disableForm: boolean;
  dropdownSelected: string;
  selectedStatus: String = "";
  destroyed$ = new Subject<boolean>();

  show = false;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private actionsSubj: ActionsSubject
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
      id: this.route.snapshot.params["id"],
    });
    this.store.pipe(select(selectAuthUserId), take(1)).subscribe((data) => {
      console.log("data", data);
      this.dataId = data;

      this.store.dispatch(new GetUserAction({ id: this.dataId }));
    });

    if (!this.isAddMode) {
      this.actionsSubj
        .pipe(
          ofType(AuthActions.AuthActionsTypes.GET_USER_SUCCESS),
          takeUntil(this.destroyed$)
        )
        .subscribe((data: any) => {
          console.log("xdatas", data);
          console.log("xdata", data["payload"]["user_profile"][0]);
          this.profile$ = data["payload"]["user_profile"][0];
          console.log("prof", this.profile$.job_location);
          let skills = data["payload"]["user_skill"][0].skills[0];

          if (data) {
            this.profForm.patchValue({
              company_name: this.profile$.company_name,
              website: this.profile$.website,
              job_location: this.profile$.job_location,
              status: this.profile$.status,
              bio: this.profile$.bio,
              areas_of_expertise: skills,
              youtube_handle: this.profile$.youtube_handle,
              twitter_handle: this.profile$.twitter_handle,
              instagram_handle: this.profile$.instagram_handle,
              facebook_handle: this.profile$.facebook_handle,
              id: this.profile$.id,
            });
          }

          /* hooray, success, show notification alert etc.. */
        });
    }
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  get status() {
    return this.profForm.get("status");
  }

  onFormSubmit() {}

  get twitter() {
    return this.profForm.get("twitter_handle");
  }

  get yt() {
    return this.profForm.get("youtube_handle");
  }

  get ig() {
    return this.profForm.get("instagram_handle");
  }

  get fb() {
    return this.profForm.get("facebook_handle");
  }

  private updateUser() {
    const updatedProfile: UserFetch = {
      company_name: this.profForm.get("company_name").value,
      website: this.profForm.get("website").value,
      job_location: this.profForm.get("job_location").value,
      status: this.profForm.get("status").value,
      bio: this.profForm.get("bio").value,
      areas_of_expertise: this.profForm.get("areas_of_expertise").value,
      id: this.profForm.get("id").value,
      // youtube_handle: this.profForm.get("youtube_handle").value,
      //instagram_handle: this.profForm.get("instagram_handle").value,
      // facebook_handle: this.profForm.get("facebook_handle").value,
      //twitter_handle: this.profForm.get("twitter_handle").value,
      twitter_handle: this.twitter.value,
      youtube_handle: this.yt.value,
      instagram_handle: this.ig.value,
      facebook_handle: this.fb.value,
    };

    this.store.dispatch(new AuthActions.UpdateProfile(updatedProfile));
  }

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
