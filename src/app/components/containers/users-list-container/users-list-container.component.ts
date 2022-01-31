import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
// import { UserState } from "../../../store/reducers/user.reducer";
import { AppState } from "../../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
// import { getUsers } from "../../../store/reducers/user.reducer";
//import { getUsersInfo } from "../../../store/app.reducers";

import { getUsersInfo } from "../../../store/app.reducers";
import { UserDetailsModel, UserCredentialsModel } from "../../../core/models";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import * as fromApp from "../../../store/app.reducers";
import {
  skipWhile,
  skip,
  take,
  filter,
  first,
  takeUntil,
} from "rxjs/operators";
import {
  getUser,
  loadUsers,
  LoadUsers,
} from "../../../store/actions/user.actions";
import { getUsers } from "src/app/store/reducers/user.reducer";
@Component({
  selector: "app-users-list-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-users-list [users]="users$"> </app-users-list> `,
})
export class UsersListContainerComponent implements OnInit {
  users$: Observable<UserCredentialsModel[]>;
  id: string;

  constructor(
    private store: Store<fromApp.AppState>,
    location: Location,
    router: Router
  ) {
    this.store.dispatch(loadUsers());
    // this.store.pipe(select(getUsersInfo), take(1)).subscribe((data) => {
    //   //   console.log("data", data["user"]);
    //   console.log("data", data);
    //   this.users$ = data["user"];
    // });
  }

  ngOnInit() {
    // this.store.dispatch(new LoadUsers());
    //this.users$ = this.store.select(getUsers);
    //console.log("this users", this.users$);
    // this.store.pipe(select(getUsers), take(1)).subscribe((data) => {
    //   console.log("data", data);
    //   this.users$ = data["user"];
    // });
    // const profile$ = this.store
    //   .select(getUsersInfo)
    //   .pipe(filter((profile) => profile !== null))
    //   .subscribe((profile) => {
    //     console.log("Users::", profile);
    //   });
  }
  // onUserSelected(id: string) {
  //   console.log("click");
  //   const path = `dev/${id}`;
  //   console.log("path", location.pathname[path]);

  //   this.store.dispatch(getUser({ id: this.id }));
  // }
}
