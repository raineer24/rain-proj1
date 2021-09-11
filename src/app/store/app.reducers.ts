import { AppState } from "./app.state";
import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "./reducers/auth.reducer";
export const AppReducers: ActionReducerMap<AppState, any> = {
  auth: authReducer,
};
