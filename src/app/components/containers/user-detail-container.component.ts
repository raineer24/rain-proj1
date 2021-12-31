import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-user-detail-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h4>user detail container component</h4> `,
})
export class UserDetailContainerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
