import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { logout } from "../../../store/actions/auth.actions";
import { AppState } from "../../../store/app.state";
import { selectAuthUserId } from "../../../store/reducers/auth.reducer";
import { UserDetailsModel, UserFetch } from "../../../core/models";
import * as fromApp from "../../../store/app.state";
import { getUser } from "../../../store/actions/auth.actions";
import * as AuthActions from "../../../store/actions/auth.actions";
import { ofType } from "@ngrx/effects";
import {
  skipWhile,
  skip,
  take,
  filter,
  first,
  takeUntil,
} from "rxjs/operators";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-user",
  templateUrl: "./user.container.html",
  styleUrls: ["./user.container.scss"],

  styles: [``],
})
export class UserComponent implements OnInit, OnDestroy {
  profile$: UserFetch;
  destroyed$ = new Subject<boolean>();
  isAddMode: boolean;
  id: string;
  appState$: Observable<fromApp.AppState>;
  userInfo$: Observable<UserDetailsModel>;
  user$: Observable<UserDetailsModel>;
  constructor(
    private store: Store<AppState>,
    private actionsSubj: ActionsSubject
  ) {}
  ngOnInit(): void {
    this.store.pipe(select(selectAuthUserId), take(1)).subscribe((data) => {
      console.log("data", data);
      this.id = data;
      this.isAddMode = !this.id;
      //this.id = data["id"];
      console.log("this id", this.id);
      this.store.dispatch(getUser({ id: this.id }));
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

    // this.actionsSubj
    //   .pipe(
    //     ofType(AuthActions.AuthActionsTypes.GET_USER_SUCCESS),
    //     takeUntil(this.destroyed$)
    //   )
    //   .subscribe((data: any) => {
    //     console.log("xdatas", data);

    //     this.profile$ = data["payload"]["user_profile"][0];

    //   });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logoutx() {
    console.log("clicked");
    this.store.dispatch(logout());
  }
}
