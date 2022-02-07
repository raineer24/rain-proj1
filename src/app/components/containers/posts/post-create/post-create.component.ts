import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription, Observable, of, Subject } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducers";
import { isLoading } from "../../../../store/app.reducers";
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
    private actionsSubj: ActionsSubject
  ) {}
  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoading));
  }
}
