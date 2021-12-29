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
  // @Effect()
  // createExperience: Observable<any> = this.actions$.pipe(
  //   ofType(UserActions.UserActionTypes.CREATE_EXP_PROFILE),
  //   map((action: UserActions.createExpProfile) => action.payload),
  //   switchMap((payload) => {
  //     console.log("payload create EXPERIENCE: ", payload);
  //     return this.authService.createExp(payload).pipe(
  //       take(1),
  //       map((user) => {
  //         console.log("create experience EFFECT: ", user.profileExpCreate);

  //         let data = user.profileExpCreate;

  //         // store user details and jwt token in local storage to keep user logged in between page refreshes

  //         // console.log("get profile Effect", user.body);

  //         return new UserActions.createExpProfileeSuccess(data);
  //       }),
  //       catchError((err) => of(new UserActions.createExpProfileFail(err)))
  //     );
  //   })
  // );

  createExperience$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createExpProfile),
      map((action) => action.payload),
      switchMap((payload) =>
        this.authService.createExp(payload).pipe(
          take(1),
          mergeMap((data) => [
            AuthActions.createExpProfileSuccess({
              payload: data["profileExpCreate"],
            }),
            AuthActions.getUser({ id: data["profileExpCreate"].users_id }),
          ]),
          tap(() => {
            setTimeout(() => {
              this.router.navigateByUrl("/user");
            }, 2000);
          }),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );

  // createExperience$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.createExpProfile),
  //     map((action) => action.payload),
  //     switchMap((payload) => {
  //       return this.authService.createExp(payload).pipe(
  //         take(1),
  //         map((user) => {
  //           console.log("user", user);
  //           return AuthActions.createExpProfileSuccess({
  //             payload: user["user"],
  //           });
  //         }),
  //         catchError((error) => of(new SetError(error)))
  //       );
  //     })
  //   )
  // );

  // deleteEduProfile$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActions.deleteEduProfile),
  //     map((action) => action.id),
  //     switchMap((payload) => {
  //       console.log("payload create EXPERIENCE: ", payload);
  //       return this.authService.deleteEdu(payload).pipe(
  //         take(1),
  //         map((user) => {
  //           console.log("delete edu profile: ", user);

  //           // let data = user.profileExpCreate;

  //           // store user details and jwt token in local storage to keep user logged in between page refreshes

  //           // console.log("get profile Effect", user.body);

  //           // return new UserActions.createExpProfileeSuccess(data);
  //         }),
  //         catchError((err) => of(new err()))
  //       );
  //     })
  //   )
  // );

  deleteEduProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteEduProfile),
      map((action) => action.id),
      switchMap((dProfile) =>
        this.authService.deleteEdu(dProfile).pipe(
          mergeMap((data) => [
            AuthActions.deleteEduProfileSuccess({
              payload: data["userEdu"],
            }),
            AuthActions.getUser({ id: data["userEdu"][0].users_id }),
          ]),
          tap(() => {
            setTimeout(() => {
              this.router.navigateByUrl("/user");
            }, 2000);
          }),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );

  deleteExpProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteExpProfile),
      map((action) => action.id),
      switchMap((dExpProfile) =>
        this.authService.deleteExp(dExpProfile).pipe(
          mergeMap((data) => [
            AuthActions.deleteExpProfileSuccess({
              payload: data["userExp"],
            }),
            AuthActions.getUser({ id: data["userExp"][0].users_id }),
          ]),
          tap(() => {
            setTimeout(() => {
              this.router.navigateByUrl("/user");
            }, 2000);
          }),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
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
