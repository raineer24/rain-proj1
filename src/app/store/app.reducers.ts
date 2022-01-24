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
import { userReducer } from "./reducers/user.reducer";
import { AuthState } from "./reducers/auth.reducer";
import { UserState } from "./reducers/user.reducer";
import { environment } from "../../environments/environment";
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

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.log("state", state);
    console.log("action", action);
    return reducer(state, action);
  };
}

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

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === "SET_ROOT_STATE") {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze, stateSetter]
  : [stateSetter];

// const metaReducersDev = [
//   storeFreeze,
//   localStorageSyncReducer,
//   stateSetter,
//   logger,
//   AppReducers,
// ];

//export const metaReducers = metaReducersDev;

export const getUserState = createFeatureSelector<UserState>("users");
export const getUsersInfo = createSelector(getUserState, (state) => {
  console.log("userstateinfo", state);
});
