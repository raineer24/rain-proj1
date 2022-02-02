import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
// import * as AuthActions from "../../store/actions/auth.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
// import { UserState } from "../../store/reducers/user.reducer";
import { AppState } from "../../store/app.reducers";
import * as userActions from "../actions/user.actions";

import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
  exhaustMap,
  delay,
  withLatestFrom,
} from "rxjs/operators";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { merge, Observable, of } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { selectUserList } from "../app.reducers";
import { GetUser, GetUserSuccess } from "../actions/user.actions";
import { SetError } from "../actions/http-errors.actions";
//import { UserActionTypes, UserActions } from "../actions/user.actions";
import * as UserActions from "../actions/user.actions";
import { GetUsers } from "../actions/user.actions";
import { getUser, getUserSuccess } from "../actions/user.actions";
@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUser>(userActions.UserActionTypes.GetUser),
    map((action) => action.payload),

    switchMap((users) => {
      console.log("users", users);

      //const selectedUser = users.filter((user) => user.id === id)[0];
      //return of(new GetUserSuccess(users));

      return this.authService.getUser(users).pipe(
        take(1),
        mergeMap((user: UserCredentialsModel) => {
          console.log("user", user);
          const selectedUser = user["user"];
          console.log("selectedUSer", selectedUser);
          return of(new userActions.GetUserSuccess(selectedUser));
          //  return of(new GetUserSuccess({payload: user['user']}));
          // return getUserSuccess({ payload: user["user"] });
        }),
        catchError((error) => of(new SetError(error)))
      );
    })
  );

  // getUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getUser),
  //     map((action) => action.id),
  //     switchMap((payload) => {
  //       console.log("payload", payload);
  //       return this.authService.getUser(payload).pipe(
  //         take(1),
  //         map((user) => {
  //           console.log("user", user);
  //           return getUserSuccess({ payload: user["user"] });
  //         }),
  //         catchError((error) => of(new SetError(error)))
  //       );
  //     })
  //   )
  // );

  // @Effect()
  // getUser$ = this._actions$.pipe(
  //   ofType<GetUser>(EUserActions.GetUser),
  //   map((action) => action.payload),
  //   withLatestFrom(this._store.pipe(select(selectUserList))),
  //   switchMap(([id, users]) => {
  //     const selectedUser = users.filter((user) => user._id === id)[0];
  //     return of(new GetUserSuccess(selectedUser));
  //   })
  // );

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(userActions.UserActionTypes.GetUsers),
    switchMap(() => this.authService.getDevelopers()),
    switchMap((user: UserCredentialsModel[]) => {
      return of(new userActions.GetUsersSuccess(user["user"]));
    })
  );
}
