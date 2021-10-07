import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as AuthActions from "../../store/actions/auth.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
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
  RegisterUserSuccess,
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
  UpdateProfile$: Observable<any> = this.actions$.pipe(
    ofType(AuthActions.AuthActionsTypes.UPDATE_PROFILE),
    map((action: AuthActions.UpdateProfile) => action.payload),
    mergeMap((user: UserFetch) =>
      this.authService.updateProfile(user).pipe(
        map(
          (updateProfile) =>
            new AuthActions.UpdateProfileSucess({
              id: updateProfile.id,
              payload: updateProfile,
            })
        ),
        catchError((error) => of(new SetError(error)))
      )
    )
  );

  @Effect()
  registerUser$ = this.actions$.pipe(
    ofType<RegisterUser>(AuthActionsTypes.RegisterUser),
    map((action) => action.payload),
    switchMap((userCredentials) =>
      this.authService.registerUsers(userCredentials).pipe(
        map((data) => new RegisterUserSuccess(data)),
        catchError((error) => of(new SetError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  registerUserSuccess$ = this.actions$.pipe(
    ofType<RegisterUserSuccess>(AuthActionsTypes.RegisterUserSuccess),
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
