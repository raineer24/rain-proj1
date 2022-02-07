import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Observable, of, Subject } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducers";
import { isLoading } from "../../../../store/app.reducers";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import * as SpinnerActions from "../../../../store/actions/spinner.actions";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isPostLoading$: Observable<boolean>;
  postForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.initForm();
    this.isLoading$ = this.store.pipe(select(isLoading));
  }

  initForm() {
    return (this.postForm = this.fb.group({
      title: ["", Validators.compose([Validators.required])],
      body: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      image: [null, Validators.required],
    }));

    //this.postsService.getPosts();
  }
  onSavePost() {
    this.store.dispatch(SpinnerActions.startSpinner());
  }
}
