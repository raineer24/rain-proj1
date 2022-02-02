import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { AppState } from "../../../store/app.reducers";
import { Store, select } from "@ngrx/store";
//import { UsersListItemDto } from "src/app/models/models";
import { getUser } from "../../../store/actions/user.actions";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-user-detail-bootstrap",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h3>test!</h3>`,
})
export class UserDetailComponent {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log("id", this._route.snapshot.params.id);
  }
}
