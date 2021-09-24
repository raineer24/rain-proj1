import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LogoutUser } from "../../../store/actions/auth.actions";
import { AppState } from "../../../store/app.state";
import { selectAuthUser } from "../../../store/reducers/auth.reducer";
import { UserDetailsModel } from "../../../core/models";
import * as fromApp from "../../../store/app.state";
import { GetUserAction } from "../../../store/actions/auth.actions";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
} from "rxjs/operators";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-user",
  template: `<h2>test user component</h2>
    <button type="button" mat-stroked-button (click)="logoutx()">Logout</button>
    <div *ngIf="appState$ | async as state">
      {{ state.auth.authUser.username | titlecase }}
      <div class="col-sm-12" *ngIf="state.auth.authUser?.user_profile == 0">
        <h4>You have not yet setup a profile, please add some info</h4>
      </div>
    </div> `,
  styles: [``],
})
export class UserComponent implements OnInit {
  id: string;
  appState$: Observable<fromApp.AppState>;
  userInfo$: Observable<UserDetailsModel>;
  user$: Observable<UserDetailsModel>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.store.pipe(select(selectAuthUser), take(1)).subscribe((data) => {
      console.log("data", data);
      this.id = data["id"];
      console.log("this id", this.id);
      this.store.dispatch(new GetUserAction({ id: this.id }));
    });

    console.log(
      "id",
      this.store.select((str) => str["auth"].authUser.id)
    );
    //  this.user$ = this.store.select(selectAuthUser);
    // console.log("this users", this.user$);
    // this.user$.subscribe((data) => {
    //   console.log("data", data.id);
    //   this.id = data.id;
    //   console.log("id data", typeof this.id);

    // });
    this.appState$ = this.store;
    console.log("appstate", this.appState$);
  }

  logoutx() {
    console.log("clicked");
    this.store.dispatch(new LogoutUser());
  }
}
