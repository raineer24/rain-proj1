import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { AppState } from "../../../store/app.state";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { getUsers } from "../../../store/reducers/auth.reducer";
import { UserDetailsModel, UserCredentialsModel } from "../../../core/models";
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
  deleteExpProfile,
  deleteEduProfile,
  loadUsers,
} from "../../../store/actions/auth.actions";
@Component({
  selector: "app-users-list-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-users-list [users]="users$"> </app-users-list> `,
})
export class UsersListContainerComponent implements OnInit {
  users$: Observable<UserCredentialsModel[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    //this.store.dispatch(loadUsers());
    //this.users$ = this.store.select(getUsers);
    //console.log("this users", this.users$);

    this.store.pipe(select(getUsers), take(1)).subscribe((data) => {
      console.log("data", data["user"]);
      this.users$ = data["user"];
    });
  }

  onUserSelected(userId: string) {
    // const path = `/workspace/users/${userId}`;
    //  this.store.dispatch(fromRouter.go({ path: [path] }));
  }
}
