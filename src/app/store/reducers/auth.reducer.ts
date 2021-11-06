import { UserDetailsModel, UserFetch } from "../../core/models";
import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import * as AuthActions from "../actions/auth.actions";
export interface AuthState extends EntityState<UserDetailsModel> {
  authUser: UserDetailsModel;
  //isLoading: boolean;
  isAuthenticated: boolean;
}
// export interface AuthState {
//   isAuthenticated: boolean | null;
//   authUser: UserDetailsModel | null;
// }

export const adapter: EntityAdapter<UserDetailsModel> =
  createEntityAdapter<UserDetailsModel>({
    selectId: (profile: UserDetailsModel) => profile.id,
  });

export const initialState: AuthState = adapter.getInitialState({
  isAuthenticated: null,
  authUser: null,
});

// export const initialState: AuthState = {
//   isAuthenticated: null,
//   authUser: null,
// };

export const authReducer = createReducer(
  initialState,

  on(AuthActions.upsertProfileSuccess, (state, { profileId, u_profile }) => {
    console.log("profileId", profileId);
    console.log("u profile", u_profile);
    console.log("state", state.authUser.user_profile[0]);

    let x = [u_profile, ...state.authUser.user_profile];

    //console.log("push", u_profile.push(state.authUser.user_profile[0]));
    return adapter.updateOne(
      { id: profileId, changes: { user_profile: u_profile } },
      state
    );
  }),

  // on(AuthActions.UpdateProfileSuccess, (state, action) => {
  //   const scopeEntity = { ...state };
  //   console.log("scope", scopeEntity);
  //   console.log(action.payload);
  //   console.log("entities", state.authUser.user_profile);
  //   return adapter.updateOne(action.payload, state);
  //   // return adapter.updateOne(
  //   //   { id, changes: { user_profile: state.entities[id].user_profile } },
  //   //   state
  //   // );
  // }),
  on(AuthActions.createProfileSuccess, (state, { payload }) => ({
    ...state,
    authUser: payload,
    loading: false,
  })),
  on(AuthActions.getUserSuccess, (state, { payload }) => ({
    ...state,
    authUser: payload,
    loading: false,
  })),
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    authUser: user,
    isAuthenticated: true,
  })),
  on(AuthActions.register, (state, action) => {
    return {
      ...state,
      loading: true,
      authUser: action.payload,
    };
  }),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    authUser: user,
    isAuthenticated: true,
  }))
);

const selectAuthState = (state: AppState) => state.auth;

export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.authUser
);

export const selectAuthUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.authUser.id
);
