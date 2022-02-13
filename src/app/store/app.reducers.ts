import {
  ActionReducerMap,
  ActionReducer,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { authReducer } from "./reducers/auth.reducer";
import { httpErrorsReducer } from "./reducers/http-errors.reducer";
import { localStorageSync } from "ngrx-store-localstorage";
import { userReducers } from "./reducers/user.reducer";
import { AuthState } from "./reducers/auth.reducer";
import { UserState, UserModuleState } from "./reducers/user.reducer";
import { environment } from "../../environments/environment";
import { HttpErrorsState } from "./reducers/http-errors.reducer";
import * as fromSpinner from "./reducers/spinner.reducers";
import { postReducer } from "./reducers/post.reducer";
import { SpinnerState } from "./reducers/spinner.reducers";
import { PostState } from "./reducers/post.reducer";

export interface AppState {
  auth: AuthState;
  users: UserState;
  httpErrors: HttpErrorsState;
  spinner: fromSpinner.SpinnerState;
  posts: PostState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  httpErrors: httpErrorsReducer,
  users: userReducers,
  spinner: fromSpinner.spinnerReducer,
  posts: postReducer,
};

// export const getProfileState = createFeatureSelector<AppState>("profile");

// export const getAuthInfoState = createSelector(
//   getProfileState,
//   (state) => state.auth
// );

// meta reducer, used to sync store to storage @ ngrx-store-localstorage.
// (https://github.com/btroncone/ngrx-store-localstorage)
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ["auth"],
    rehydrate: true,
    storage: localStorage,
  })(reducer);
}

// export const metaReducers: MetaReducer<AppState>[] = !environment.production
//   ? [logger, storeFreeze, stateSetter]
//   : [stateSetter];

export const metaReducers: Array<MetaReducer<any, any>> = [
  localStorageSyncReducer,
];

// const metaReducersDev = [
//   storeFreeze,
//   localStorageSyncReducer,
//   stateSetter,
//   logger,
//   AppReducers,
// ];

//export const metaReducers = metaReducersDev;

// export const selectSpinnerState =
//   createFeatureSelector<SpinnerState>("spinner");

const selectPostsState = (state: AppState) => state.posts;

const selectSpinnerState = (state: AppState) => state.spinner;

const selectAuthState = (state: AppState) => state.auth;

export const isLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const generateAllPosts = createSelector(
  selectPostsState,
  (state) => state.posts
);

export const isLoading = createSelector(
  selectSpinnerState,
  (state) => state.loading
);

const selectUsers = (state: AppState) => state.users;
export const selectUserList = createSelector(
  selectUsers,
  (state: UserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: UserState) => state.selectedUser
);

// export const getUserState = createFeatureSelector<UserState>("users");
// export const getUsersInfo = createSelector(getUserState, (state) => {
//   console.log("userstateinfo: ", state.users);
// });
