import {
  ActionReducerMap,
  ActionReducer,
  createFeatureSelector,
  createSelector,
  createAction,
  createReducer,
  on,
} from "@ngrx/store";
import { UserDetailsModel } from "../../core/models";

//Action
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

export interface UserState {
  users: UserDetailsModel[];
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
  })
);

export const getProfileState = createFeatureSelector<UserState>("profile");

export const getUserInfoState = createSelector(
  getProfileState,
  (state) => state["userInfo"]
);

export const getUserId = createSelector(
  getUserInfoState,
  (state) => state["userInfo"].appUserId
);

// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );
