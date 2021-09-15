import { AuthState } from "./reducers/auth.reducer";
import { HttpErrorsState } from "./reducers/http-errors.reducer";
export interface AppState {
  auth: AuthState;
  httpErrors: HttpErrorsState;
}
