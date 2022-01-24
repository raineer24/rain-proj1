import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
// import * as AuthActions from "../../store/actions/auth.actions";
import * as UserActions from "../../store/actions/user.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
import { UserState } from "../../store/reducers/user.reducer";

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
export class UserEffects {
  // loadUsers$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loadUsers),
  //     exhaustMap(() => {
  //       return this.authService.getDevelopers().pipe(
  //         map((users) => UserActions.loadUsersSuccess(users)),
  //         catchError((error) => of(new SetError(error)))
  //       );
  //     })
  //   )
  // );

  getAlluser$: Observable<any> = this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap((action:  => {
      return this.adminService.getAllUser().pipe(
        map((data: User[]) => {
          return new userActions.SuccessInitUsers(data);
        }),
        catchError((error) => {
          if (error.error.status === Token_Exp) {
            this.store.dispatch(new authActions.Logout(""));
          }
          return of(new userActions.ErroALL(error.error));
        })
      );
    })
  );

  // getAlluser$: Observable<Action> = this.actions$.pipe(
  //   ofType(UserActionTypes.LOAD_USERS),
  //   switchMap((action: UserActions) => {
  //     return this.adminService.getAllUser().pipe(
  //       map((data: User[]) => {
  //         return new userActions.SuccessInitUsers(data);
  //       }),
  //       catchError((error) => {
  //         if (error.error.status === Token_Exp) {
  //           this.store.dispatch(new authActions.Logout(""));
  //         }
  //         return of(new userActions.ErroALL(error.error));
  //       })
  //     );
  //   })
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

  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<UserState>
  ) {}
}
