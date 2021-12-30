import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
@Component({
  selector: "app-users-list-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-users-list></app-users-list> `,
})
export class UsersListContainerComponent implements OnInit {
  //users$: Observable<UsersListItemDto[]>;

  //constructor(private store: Store<fromStore.UsersState>) {}

  ngOnInit() {
    // this.users$ = this.store.select(fromStore.getUsers);
  }

  onUserSelected(userId: string) {
    // const path = `/workspace/users/${userId}`;
    //  this.store.dispatch(fromRouter.go({ path: [path] }));
  }
}
