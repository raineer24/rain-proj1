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
import { PostsService } from "../../../../core/services/posts.service";
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
  private postId: string;
  author: string;
  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private postsService: PostsService
  ) {}
  ngOnInit() {
    console.log("this.mode", this.mode);
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

    // RETRIEVE POST FROM STORE TO POPULATE FORM //
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get("postId")) {
        this.mode = "edit";
      } else {
        this.mode = "create";
        this.postId = undefined;
      }
    });
  }

  // onSubmit(e) {
  //   if (e.target !== undefined) {
  //     this.fd.append("image", e.target.files[0]);
  //     return (this.postForm.value.image = this.fd);
  //   }
  //   this.fd.append("title", this.postForm.value.title);
  //   this.fd.append("content", this.postForm.value.content);

  //   return this.postsService.upload(this.fd).subscribe((data) => {
  //     this.fd = new FormData();
  //     console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(data)}`);
  //     this.postForm.reset();
  //   });
  // }

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
      post.append("users_id", this.author);

      this.store.dispatch(PostActions.createPost({ post }));

      // return this.postsService.createPost(post).subscribe((data) => {
      //   // this.fd = new FormData();
      //   console.log(`SAVED SUCCESSFULLY. ${JSON.stringify(data)}`);
      //   // this.postForm.reset();
      // });
    } else {
      this.mode === "edit";
    }
    this.postForm.reset();
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
