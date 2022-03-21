import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { isLoggedIn } from "../../store/app.reducers";
import { Subscription } from "rxjs";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
//import { logout } from "../../../store/actions/auth.actions";
import { AppState } from "../../store/app.reducers";
import { map } from "rxjs/operators";
@Component({
  selector: "app-header",
  styleUrls: ["header.component.scss"],
  template: `<app-responsive-toolbar color="primary"></app-responsive-toolbar>`,
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn$: Observable<boolean>;
  subscription: Subscription;
  userId: string;
  isLoggedIn = false;
  timer: any;
  @Input() isSigningUpEnabled: boolean;

  constructor(private store: Store<AppState>) {
    this.loggedIn$ = this.store.select(
      (state) => state["auth"].isAuthenticated
    );
  }

  ngOnInit() {
    // this.subscription = this.store
    //   .select("auth")
    //   .pipe(map((authState) => authState))
    //   .subscribe((auth) => {
    //     // console.log("auth", auth["authUser"].id);
    //     this.userId = auth["authUser"] ? auth["authUser"].id : "";
    //     this.isLoggedIn = !!auth["authUser"].id;
    //   });
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    this.subscription.unsubscribe();
  }
}
