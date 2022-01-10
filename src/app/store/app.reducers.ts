import { AppState } from "./app.state";
import {
  ActionReducerMap,
  ActionReducer,
  createFeatureSelector,
} from "@ngrx/store";
import { authReducer } from "./reducers/auth.reducer";
import { httpErrorsReducer } from "./reducers/http-errors.reducer";
import { localStorageSync } from "ngrx-store-localstorage";
import { userReducer } from "./reducers/user.reducer";
export const AppReducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
  httpErrors: httpErrorsReducer,
};

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
