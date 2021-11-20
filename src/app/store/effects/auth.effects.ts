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

@Injectable()
export class AuthEffects {
  deleteEduProfileSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.deleteEduProfileSuccess),
        map((action) => {
          //    console.log("success action", action);
          this.router.navigate(["/user"]);
          //    this.store.dispatch(getUser({ id: action.profileId }));
        })
      ),
    { dispatch: false }
  );

  deleteEduProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteEduProfile),
      //  map((action) => action.profileId),
      switchMap((payload) => {
        // const pro
        return this.authService.deleteEdu(payload.id).pipe(
          take(1),
          map((user) => {
            console.log("user", user);
            return AuthActions.deleteEduProfileSuccess({
              payload: user["userEdu"],
            });
          }),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  deleteExpProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteExpProfile),
      //  map((action) => action.profileId),
      switchMap((payload) => {
        // const pro
        return this.authService.deleteExp(payload.id).pipe(
          take(1),
          map((user) => {
            console.log("user", user);
            return AuthActions.deleteExpProfileSuccess({
              payload: user["user"],
            });
          }),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  deleteExpProfileSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.deleteExpProfileSuccess),
        map((action) => {
          console.log("success action", action);
          this.router.navigate(["/user"]);
          //    this.store.dispatch(getUser({ id: action.profileId }));
        })
      ),
    { dispatch: false }
  );

  upsertProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.upsertProfile),
      //  map((action) => action.profileId),
      switchMap((payload) => {
        // const pro
        return this.authService.updateProfile(payload.u_profile).pipe(
          take(1),
          map((user) => {
            console.log("user", user);
            return AuthActions.upsertProfileSuccess({
              profileId: payload.profileId,
              u_profile: user["userp"],
            });
          }),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  upsertProfileSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.upsertProfileSuccess),
        map((action) => {
          console.log("success action", action);
          this.router.navigate(["/user"]);
          //    this.store.dispatch(getUser({ id: action.profileId }));
        })
      ),
    { dispatch: false }
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

  createProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createProfile),
      map((action) => action.payload),
      switchMap((cProfile) =>
        this.authService.createProfile(cProfile).pipe(
          mergeMap((data) => [
            AuthActions.createProfileSuccess({
              payload: data["profileCreate"],
            }),
            AuthActions.getUser({ id: data["profileCreate"].users_id }),
          ]),
          tap(() => {
            setTimeout(() => {
              this.router.navigateByUrl("/");
            }, 2000);
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

  // createProfileSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.createProfileSuccess),
  //       tap(() => {
  //         this.router.navigateByUrl("/");
  //       })
  //     ),
  //   { dispatch: false }
  // );

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
