import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-user",
  template: `<h2>test user component</h2>
    <button mat-stroked-button (click)="(logout)">Logout</button>`,
  styles: [``],
})
export class UserComponent implements OnInit {
  ngOnInit() {}

  onLogout() {
    // this.store.dispatch(new LogoutUser());
  }
}
