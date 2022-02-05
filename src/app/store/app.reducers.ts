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

export interface AppState {
  auth: AuthState;
  users: UserState;
  httpErrors: HttpErrorsState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  httpErrors: httpErrorsReducer,
  users: userReducers,
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
    storage: sessionStorage,
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
