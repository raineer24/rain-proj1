import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LogoutUser } from "../../../store/actions/auth.actions";
import { AppState } from "../../../store/app.state";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-user",
  template: `<h2>test user component</h2>
    <button mat-stroked-button (click)="(logout)">Logout</button>`,
  styles: [``],
})
export class UserComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  ngOnInit() {}

  logout() {
    this.store.dispatch(new LogoutUser());
  }
}
