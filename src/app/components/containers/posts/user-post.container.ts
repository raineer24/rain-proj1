import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Subscription, Observable, of, Subject } from "rxjs";
import { AppState } from "../../../store/app.reducers";
@Component({
  selector: "app-user-post",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
     test
    </div>
  `,
  styles: [``],
})
export class UserPostComponent implements OnInit {
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {}
}
