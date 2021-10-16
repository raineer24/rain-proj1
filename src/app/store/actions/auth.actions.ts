import { Action } from "@ngrx/store";
import { UserDetailsModel, IError } from "../../core/models/";
import {
  UserCredentialsModel,
  UserFetch,
  LoginUserDto,
} from "../../core/models/";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export const loginSuccess = createAction(
  "[Auth/API] Login Success", //
  props<{ user: any }>()
);

export const loginFailure = createAction(
  "[Auth/API] Login Failure", //
  props<{ error: IError }>()
);

export const login = createAction(
  "[Login Form] Login",
  props<{ dto: LoginUserDto }>()
);
