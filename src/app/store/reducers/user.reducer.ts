import {
  ActionReducerMap,
  ActionReducer,
  createFeatureSelector,
  createSelector,
  createAction,
  createReducer,
  on,
  Action,
} from "@ngrx/store";
import { UserDetailsModel, UserCredentialsModel } from "../../core/models";
import * as UserActions from "../actions/user.actions";
//Action

// export const loadUsers = createAction("[Users Management] Load Users", () => ({
//   showLoader: true,
// }));

export const loadUser = createAction(
  "[Users Management] Load User",
  (userId: string) => ({
    userId,
    showLoader: true,
  })
);

export const loadUserSuccess = createAction(
  "[Users Management] Load User Success",
  (viewModel: UserDetailsModel) => ({
    viewModel,
    triggerAction: loadUser.type,
  })
);

export const loadUserFail = createAction(
  "[Users Management] Load User Fail",
  (error: any) => ({
    error,
    triggerAction: loadUser.type,
  })
);

// export const loadUsersSuccess = createAction(
//   "[Users Management] Load Users Success",
//   (users: UserCredentialsModel[]) => ({
//     users,
//     triggerAction: loadUsers.type,
//   })
// );

// export const loadUsersFail = createAction(
//   "[Users Management] Load Users Fail",
//   (error: any) => ({
//     error,
//     triggerAction: loadUsers.type,
//   })
// );

export interface UserState {
  users: UserCredentialsModel[];
  user: UserDetailsModel;
  pub: any;
  ourerror: string;
}

export const initialState: UserState = {
  users: null,
  user: null,
  pub: null,
  ourerror: null,
};

// export const initialState: UserState = {
//   user: null,
// };

export const userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state, { viewModel }) => {
    const user = viewModel;

    return {
      ...state,
      user,
    };
  }),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    console.log("users", users);
    return {
      ...state,
      users,
      loaded: true,
    };
  })
);

export function user_reducer(state: UserState | undefined, action: Action) {
  console.log("userReducer", state);
  return userReducer(state, action);
}

export const getProfileState = createFeatureSelector<UserState>("users");

export const getUsers = createSelector(getProfileState, (state) => {
  console.log("State: ", state);
});

// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );
