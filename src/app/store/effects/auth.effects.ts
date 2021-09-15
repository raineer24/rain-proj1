import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { AuthActionsTypes,LoginUser, LoginUserSuccess } from "../actions/auth.actions";\
import {SetError} from '../actions/http-errors.actions';

@Injectable()
export class AuthEffects {
    constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {
  }

   @Effect()
  loginUser$ = this.actions$.pipe(
    ofType<LoginUser>(AuthActionsTypes.LoginUser),
    map(action => action.payload),
    switchMap(credential => this.authService.login(credential).pipe(
      map(user => new LoginUserSuccess(user)),
      catchError(error => of(new SetError(error)))
    ))
  );

  @Effect()
  loginUserSuccess$ = this.actions$.pipe(
    ofType<LoginUserSuccess>(AuthActionsTypes.LoginUserSuccess),
    tap(() => this.router.navigateByUrl('/network')),
    switchMap(() => [new GetCurrentUser(false), new GetNetworkPersonalIdentity()])
  );
}
