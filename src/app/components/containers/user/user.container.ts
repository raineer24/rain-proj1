import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LogoutUser } from "../../../store/actions/auth.actions";
import { AppState } from "../../../store/app.state";
import { selectAuthUser } from "../../../store/reducers/auth.reducer";
import { UserDetailsModel } from "../../../core/models";
import * as fromApp from "../../../store/app.state";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-user",
  template: `<h2>test user component</h2>
    <button type="button" mat-stroked-button (click)="logoutx()">Logout</button>
    <mat-toolbar *ngIf="appState$ | async as state"
      ><div>
        {{ state.auth.authUser.user.username | titlecase }}
      </div></mat-toolbar
    >`,
  styles: [``],
})
export class UserComponent implements OnInit {
  appState$: Observable<fromApp.AppState>;

  user$: Observable<UserDetailsModel>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.user$ = this.store.select(selectAuthUser);
    console.log("this users", this.user$);
    this.appState$ = this.store;
    console.log("appstate", this.appState$);
  }

  logoutx() {
    console.log("clicked");
    this.store.dispatch(new LogoutUser());
  }
}
