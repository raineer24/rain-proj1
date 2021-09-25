import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
} from "rxjs/operators";
import { Observable, of } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import {
  AuthActionsTypes,
  GetUserAction,
  LoginUser,
  LoginUserSuccess,
  LogoutUser,
  GetUserSuccessAction,
  RegisterUser,
  RegisterUseSuccess,
} from "../actions/auth.actions";
import { SetError } from "../actions/http-errors.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType<RegisterUser>(AuthActionsTypes.RegisterUser),
    map((action) => action.payload),
    switchMap((userCredentials) =>
      this.authService.registerUsers(userCredentials).pipe(
        map((data) => new RegisterUseSuccess(data)),
        catchError((error) => of(new SetError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  registerUserSuccess$ = this.actions$.pipe(
    ofType<RegisterUseSuccess>(AuthActionsTypes.RegisterUseSuccess),
    tap(() => this.router.navigateByUrl("/login"))
  );

  @Effect()
  loginUser$ = this.actions$.pipe(
    ofType<LoginUser>(AuthActionsTypes.LoginUser),
    map((action) => action.payload),
    switchMap((credential) =>
      this.authService.login(credential).pipe(
        map((user) => {
          return new LoginUserSuccess(user["user"]);
        }),
        catchError((error) => of(new SetError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  loginUserSuccess$ = this.actions$.pipe(
    ofType<LoginUserSuccess>(AuthActionsTypes.LoginUserSuccess),
    tap(() => this.router.navigate(["/user"]))
    //switchMap(() => [new GetCurrentUser(false), new GetNetworkPersonalIdentity()])
  );

  @Effect({ dispatch: false })
  logoutUser$ = this.actions$.pipe(
    ofType<LogoutUser>(AuthActionsTypes.LogoutUser),
    tap(() => {
      console.log("clicked effex");
      this.router.navigate(["/login"]);
    })
  );

  @Effect()
  getUserInfo$ = this.actions$.pipe(
    ofType<GetUserAction>(AuthActionsTypes.GET_USER),
    map((action) => action.payload),
    switchMap((payload) => {
      return this.authService.getUser(payload.id).pipe(
        take(1),
        map((user) => {
          console.log("user", user);
          return new GetUserSuccessAction(user["user"]);
        }),
        catchError((error) => of(new SetError(error)))
      );
    })
  );
}
