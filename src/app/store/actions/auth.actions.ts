import { Action } from "@ngrx/store";
import {
  UserCredentialsModel,
  UserFetch,
  LoginUserDto,
  UserDetailsModel,
  IError,
} from "../../core/models/";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export const loginFailure = createAction(
  "[Auth/API] Login Failure", //
  props<{ error: IError }>()
);

export const register = createAction(
  "[Auth] Pango Register",
  props<{
    payload: FormData;
  }>()
);
export const registerFailure = createAction("[Auth] Register Pango Failure");
export const registerSuccess = createAction(
  "[Auth] Register Pango Success",
  props<{ user: any }>()
);

export const login = createAction(
  "[Auth] Pango Login",
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  "[Auth] Login Pango Success",
  props<{ user: any }>()
);

export const logout = createAction("[Auth] Logout");
export const loggedOut = createAction("[Auth] Logged out");
