import {
  ActionReducerMap,
  ActionReducer,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { authReducer } from "./reducers/auth.reducer";
import { httpErrorsReducer } from "./reducers/http-errors.reducer";
import { localStorageSync } from "ngrx-store-localstorage";
import { userReducer } from "./reducers/user.reducer";
import { AuthState } from "./reducers/auth.reducer";
import { UserState } from "./reducers/user.reducer";
import { HttpErrorsState } from "./reducers/http-errors.reducer";

export interface AppState {
  auth: AuthState;
  users: UserState;
  httpErrors: HttpErrorsState;
}

export const AppReducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
  httpErrors: httpErrorsReducer,
  users: userReducer,
};

export const getProfileState = createFeatureSelector<AppState>("profile");

export const getAuthInfoState = createSelector(
  getProfileState,
  (state) => state.auth
);

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
