import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Observable, of, Subject } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducers";
import { isLoading } from "../../../../store/app.reducers";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import * as SpinnerActions from "../../../../store/actions/spinner.actions";
import { Posts } from "../../../../core/models/";
import { AuthService } from "../../../../core/services/auth.service";
import * as PostActions from "../../../../store/actions/post.actions";
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
  sessionStorageAuthData: string;
  author: string;
  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
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
    this.sessionStorageAuthData = this.authService.getUserAuth();
    this.author = this.sessionStorageAuthData["authUser"].id;
    console.log("author", this.author);
  }

  onSavePost() {
    if (this.postForm.invalid) {
      return;
    }
    if (this.mode === "create") {
      const post = new FormData();

      post.append("id", undefined);
      post.append("title", this.postForm.value.title);
      post.append("body", this.postForm.value.body);
      post.append("image", this.postForm.value.image);
      post.append("author", this.author);

      this.store.dispatch(PostActions.createPost({ post }));
    } else if (this.mode === "edit") {
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
