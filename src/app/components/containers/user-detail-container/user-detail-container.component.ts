import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from "@angular/core";

import { Store, select, ActionsSubject } from "@ngrx/store";
import { logout } from "../../../store/actions/auth.actions";
import { AppState } from "../../../store/app.state";

import {
  selectAuthUserId,
  selectAuthUser,
} from "../../../store/reducers/auth.reducer";
import { Router, ActivatedRoute } from "@angular/router";
import { getUser } from "../../../store/actions/auth.actions";
import { ofType } from "@ngrx/effects";
import * as AuthActions from "../../../store/actions/auth.actions";
import {
  skipWhile,
  skip,
  take,
  filter,
  first,
  takeUntil,
} from "rxjs/operators";
import { Subject, Observable, Subscription } from "rxjs";
import { UserDetailsModel, UserFetch } from "src/app/core/models";
import { AnyFn } from "@ngrx/store/src/selector";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-user-detail-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h4>test</h4> `,
})
export class UserDetailContainerComponent implements OnInit {
  profile$: Observable<UserDetailsModel>;
  dataId: string;
  destroyed$ = new Subject<boolean>();
  actionSub = new Subscription();

  datus: Observable<any>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private actionsSubj: ActionsSubject
  ) {}

  ngOnInit() {
    this.store.pipe(select(selectAuthUserId), take(1)).subscribe((data) => {
      console.log("user detail data", data);
      this.dataId = data;
      this.store.dispatch(getUser({ id: this.dataId }));
    });

    // this.actionsSubj
    //   .pipe(ofType(AuthActions.getUserSuccess), takeUntil(this.destroyed$))
    //   .subscribe((data: any) => {
    //     console.log("xdatas", data);
    //     console.log("xdata", data["payload"]["user_profile"][0]);
    //     console.log("xdata 1", data["payload"]);
    //     this.profile$ = data["payload"];
    //     console.log(
    //       "email",
    //       this.profile$.subscribe((data) => {
    //         console.log(data.email);
    //       })
    //     );
    //   });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
