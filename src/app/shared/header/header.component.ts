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
  template: ` <div
    class="container"
    fxLayout="column"
    fxLayout.xs="column"
    fxLayoutAlign="center"
    fxLayoutGap="0px"
    fxLayoutGap.xs="0"
  >
    <div class="item header-content" fxFlex="100%" fxFlexOffset.xs="0">
      <mat-toolbar>
        <span mat-card-avatar class="example-header-image"></span>
        <span>Social Media Management</span>
        <span class="example-spacer"></span>
        <button mat-button routerLink="/"><mat-icon>home</mat-icon></button>
        <button mat-button [routerLink]="['posts']" *ngIf="loggedIn$ | async">
          <span class="material-icons">post_add</span>
        </button>
        <button mat-button routerLink="/dev">
          <span class="material-icons">people</span>
        </button>
        <button mat-button [routerLink]="['home']">
          <span class="material-icons">work</span>
        </button>
      </mat-toolbar>
    </div>
  </div>`,
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
