import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as AuthActions from "../../store/actions/auth.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
import { AppState } from "../../store/app.state";

import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
  exhaustMap,
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

@Injectable()
export class AuthEffects {
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.UpdateProfile),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.authService.updateProfile(payload).pipe(
          take(1),
          map((user) => {
            console.log("user", user);
            return AuthActions.UpdateProfileSuccess({
              payload: user["userp"],
            });
          }),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      map((action) => action.id),
      switchMap((payload) => {
        return this.authService.getUser(payload).pipe(
          take(1),
          map((user) => {
            console.log("user", user);
            return getUserSuccess({ payload: user["user"] });
          }),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      map((action) => action.payload),
      mergeMap((register) =>
        this.authService.registerUsers(register).pipe(
          map((data) => {
            this.router.navigate(["/login"]);
            console.log("data", data);

            return registerSuccess({ user: data["data"] });
          }),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((data) => {
            console.log("data", data);
            return loginSuccess({ user: data["user"] });
          }),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );

  loginSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigateByUrl("/");
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        AuthService.clearToken();
        this.router.navigateByUrl("/login");
        return loggedOut();
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}
}
