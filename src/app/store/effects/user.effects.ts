import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
// import * as AuthActions from "../../store/actions/auth.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
import { UserState } from "../../store/reducers/user.reducer";
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
@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private authService: AuthService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<UserState>
  ) {}

  // loadUsers$: Observable<any> = this.actions$.pipe(
  //   ofType(UserActions.loadUsers),
  //   switchMap(() =>
  //     this.authService.getDevelopers().pipe(
  //       map((users: UserCredentialsModel[]) =>
  //         UserActions.loadUsersSuccess({ payload: users["user"] })
  //       ),
  //       catchError((error) => of(new SetError(error)))
  //     )
  //   )
  // );
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => {
        return this.authService.getDevelopers().pipe(
          map((users: UserCredentialsModel[]) =>
            UserActions.loadUsersSuccess({ users: users["user"] })
          ),
          catchError((error) => of(new SetError(error)))
        );
      })
    )
  );

  // @Effect()
  // getAlluser$: Observable<any> = this.actions$.pipe(
  //   ofType(UserActionTypes.LOAD_USERS),
  //   switchMap((action: UserActions) => {
  //     return this.authService.getDevelopers().pipe(
  //       map((data: UserCredentialsModel[]) => {
  //         console.log("data", data["user"]);
  //         // return new userActions.SuccessInitUsers(data);
  //       }),
  //       // catchError((error) => {
  //       //   // if (error.error.status === Token_Exp) {
  //       //   //   this.store.dispatch(new authActions.Logout(""));
  //       //   // }
  //       //   return of(new userActions.ErroALL(error.error));
  //       // })
  //       catchError((error) => of(new SetError(error)))
  //     );
  //   })
  // );

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
}
