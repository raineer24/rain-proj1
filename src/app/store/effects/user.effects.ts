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
} from "rxjs/operators";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { merge, Observable, of } from "rxjs";
import { AuthService } from "../../core/services/auth.service";

import {
  login,
  loginSuccess,
  loggedOut,
  logout,
  register,
  registerSuccess,
  getUser,
  getUserSuccess,
} from "../actions/auth.actions";
import { SetError } from "../actions/http-errors.actions";
//import { UserActionTypes, UserActions } from "../actions/user.actions";
import * as UserActions from "../actions/user.actions";
import { GetUsers } from "../actions/user.actions";
@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // loadUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loadUsers),
  //     switchMap(() => {
  //       return this.authService.getDevelopers().pipe(
  //         map((users: UserCredentialsModel[]) =>
  //           UserActions.loadUsersSuccess({ users: users["user"] })
  //         ),
  //         catchError((error) => of(new SetError(error)))
  //       );
  //     })
  //   )
  // );

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(userActions.UserActionTypes.GetUsers),
    switchMap(() => this.authService.getDevelopers()),
    switchMap((user: UserCredentialsModel[]) => {
      return of(new userActions.GetUsersSuccess(user["user"]));
    })
  );

  // @Effect()
  // getUsers$ = this._actions$.pipe(
  //   ofType<GetUsers>(EUserActions.GetUsers),
  //   switchMap(() => this._usersService.getUsers()),
  //   switchMap((user: User[]) => {
  //     return of(new GetUsersSuccess(user));
  //   })
  // );
}
