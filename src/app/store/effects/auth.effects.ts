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
import { Observable, of } from "rxjs";
import { AuthService } from "../../core/services/auth.service";

import {
  login,
  loginSuccess,
  loggedOut,
  logout,
} from "../actions/auth.actions";
import { SetError } from "../actions/http-errors.actions";

@Injectable()
export class AuthEffects {
  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.login),
  //     exhaustMap(({ dto }) =>
  //       this.authService.login(dto).pipe(
  //         map((user) => AuthActions.loginSuccess({ user })),
  //         catchError((error) => of(new SetError(error)))
  //       )
  //     )
  //   )
  // );

  // loginSuccess = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loginSuccess),
  //     tap(() => this.router.navigate(["/user"]))
  //   )
  // );

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
