import { NGXLogger } from "ngx-logger";
import { environment } from "../../environments/environment";
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { AuthState } from "./reducers/auth.reducer";
import { HttpErrorsState } from "./reducers/http-errors.reducer";
export interface AppState {
  auth: AuthState;
  httpErrors: HttpErrorsState;
}
