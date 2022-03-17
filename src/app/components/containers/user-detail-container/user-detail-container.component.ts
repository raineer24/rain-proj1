import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from "@angular/core";

import { Store, select, ActionsSubject } from "@ngrx/store";
import { logout } from "../../../store/actions/auth.actions";
import { AppState } from "../../../store/app.reducers";
import { selectSelectedUser } from "../../../store/app.reducers";
import { selectAuthUserId } from "../../../store/reducers/auth.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import { GetUser } from "../../../store/actions/user.actions";
//import { getUser } from "../../../store/actions/user.actions";
import { ofType } from "@ngrx/effects";
import * as UserActions from "../../../store/actions/user.actions";
import {
  skipWhile,
  skip,
  take,
  filter,
  first,
  takeUntil,
} from "rxjs/operators";
import { Subject, Observable, Subscription } from "rxjs";
import {
  UserDetailsModel,
  UserFetch,
  UserCredentialsModel,
} from "src/app/core/models";
import { AnyFn } from "@ngrx/store/src/selector";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import * as SpinnerActions from "../../../store/actions/spinner.actions";
import { isLoading } from "../../../store/app.reducers";
@Component({
  selector: "app-user-detail-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="container">
    <mat-spinner *ngIf="isLoading$ | async" class="mx-auto"></mat-spinner>
    <div class="row">
      <div class="row-header">
        <mat-card class="example-card">
          <mat-card-content fxLayout="column">
            <div class="td">
              <ul>
                <li>Name: {{ user.first_name }}</li>
                <li>Username: {{ user.username }}</li>
                <li>
                  <div class="food-image">
                    <img src="{{ user.image_url }}" />
                  </div>
                </li>
              </ul></div></mat-card-content
          >User detail Component
        </mat-card>
      </div>
    </div>
  </div>`,
  styleUrls: ["./user-detail-container.component.scss"],
})
export class UserDetailContainerComponent implements OnInit {
  isLoading$: Observable<boolean>;
  profile$: Observable<UserDetailsModel>;
  dataId: string;
  destroyed$ = new Subject<boolean>();
  actionSub = new Subscription();
  public user: any;
  storeSub!: Subscription;

  datus: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private actionsSubj: ActionsSubject
  ) {}

  ngOnInit() {
    console.log("id", typeof this.route.snapshot.params.id);
    this.store.dispatch(SpinnerActions.startSpinner());
    this.store.dispatch(new GetUser(this.route.snapshot.params.id));
    this.storeSub = this.store
      .pipe(select(selectSelectedUser))
      .subscribe((data) => {
        console.log("data", data);
        this.user = data;
      });
    this.isLoading$ = this.store.pipe(select(isLoading));

    //console.log("this.username", this.user.email);

    // this.store.dispatch(getUser({ id: this.route.snapshot.params.id }));

    // this.store.pipe(select(selectAuthUserId), take(1)).subscribe((data) => {
    //   console.log("user detail data", data);
    //   this.dataId = data;
    //   this.store.dispatch(getUser({ id: this.dataId }));
    // });
    // this.actionsSubj
    //   .pipe(ofType(AuthActions.getUserSuccess), takeUntil(this.destroyed$))
    //   .subscribe((data: any) => {
    //     console.log("xdatas", data);
    //     console.log("xdata", data["payload"]["user_profile"][0]);
    //     console.log("xdata 1", data["payload"]);
    //     this.profile$ = data["payload"];
    //     console.log(
    //       "email",
    //       this.profile$.subscribe((data) => {
    //         console.log(data.email);
    //       })
    //     );
    //   });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
    this.store.dispatch(new UserActions.ClearStateAction());
    // this.store.dispatch(new GetUser(this.route.snapshot.params.id));
  }
}
