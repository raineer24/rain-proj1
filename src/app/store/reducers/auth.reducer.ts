import { UserDetailsModel, UserFetch } from "../../core/models";
import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import * as AuthActions from "../actions/auth.actions";
// export interface AuthState extends EntityState<UserDetailsModel> {
//   authUser: UserDetailsModel;
//   isLoading: boolean;
//   isAuthenticated: boolean;
// }
export interface AuthState {
  isAuthenticated: boolean | null;
  authUser: UserDetailsModel | null;
}

export const initialState: AuthState = {
  isAuthenticated: null,
  authUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,

    (state, { user }) => ({ ...state, user, isAuthenticated: true })
  )
);

const selectAuthState = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.authUser
);
