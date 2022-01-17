import {
  UserDetailsModel,
  UserFetch,
  UserCredentialsModel,
} from "../../core/models";
//import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

import * as AuthActions from "../actions/auth.actions";
export interface AuthState extends EntityState<UserDetailsModel> {
  authUser: UserDetailsModel;
  //isLoading: boolean;
  isAuthenticated: boolean;
  users: UserCredentialsModel[];
}
// export interface AuthState {import { createAction, createReducer, on, Action } from "@ngrx/store";
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
  users: [],
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
  on(AuthActions.loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      users,
      loaded: true,
    };
  }),
  on(AuthActions.createProfile, (state, action) => {
    return adapter.addOne(action.payload, state);
  }),
  on(AuthActions.createEduProfile, (state, action) => {
    return adapter.addOne(action.payload, state);
  }),
  on(AuthActions.createExpProfile, (state, action) => {
    return adapter.addOne(action.payload, state);
  }),
  on(AuthActions.deleteExpProfileSuccess, (state, action) => {
    return adapter.removeOne(action.payload, state);
  }),
  on(AuthActions.deleteEduProfileSuccess, (state, action) => {
    return adapter.removeOne(action.payload, state);
  }),
  on(AuthActions.createProfileSuccess, (state, action) => {
    return {
      ...state,
      loading: true,
      authUser: action.payload,
    };
  }),

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

export const getUserState = createFeatureSelector<AuthState>("auth");

//const selectAuthState = (state: AuthState) => state;

export const getAuthInfoState = createSelector(
  getUserState,
  (state) => state.authUser
);

export const selectAuthUserId = createSelector(
  getAuthInfoState,
  (state) => state.id
);

// export const selectAuthUser = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.authUser
// );

// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );

// export const selectAuthUserId = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.authUser.id
// );
