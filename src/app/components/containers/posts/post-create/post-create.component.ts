import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Observable, of, Subject } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducers";
import { isLoading } from "../../../../store/app.reducers";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import * as SpinnerActions from "../../../../store/actions/spinner.actions";
import { Posts } from "../../../../core/models/";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isPostLoading$: Observable<boolean>;
  postForm: FormGroup;
  imagePreview: any;
  post: Posts;
  private mode = "create";
  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.postForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      body: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      image: [null, Validators.required],
    });
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  onSavePost() {
    if (this.postForm.invalid) {
      return;
    }
    if (this.mode === "create") {
      const post = new FormData();
    } else {
    }
    this.store.dispatch(SpinnerActions.startSpinner());
  }

  onSelectFile(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    console.log("file", file);
    this.postForm.patchValue({
      image: file,
    });
    this.postForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      // this.imagePreview = this.sanitizer.bypassSecurityTrustResourceUrl(<string>reader.result);
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
