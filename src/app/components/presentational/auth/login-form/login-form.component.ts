import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as SpinnerActions from "../../../../store/actions/spinner.actions";
import { isLoading } from "../../../../store/app.reducers";
import { Subscription, Observable, of, Subject } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnInit {
  isLoading$: Observable<boolean>;
  @Input() form: FormGroup;
  @Output() login: EventEmitter<void> = new EventEmitter<void>();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(isLoading));
  }
}
