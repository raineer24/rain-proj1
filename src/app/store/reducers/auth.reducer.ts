import { UserDetailsModel } from "../../core/models/users/user-details.model";
import { AuthActions, AuthActionsTypes } from "../actions/auth.actions";
import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface AuthState extends EntityState<UserDetailsModel> {
  authUser: UserDetailsModel;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const adapter: EntityAdapter<UserDetailsModel> =
  createEntityAdapter<UserDetailsModel>();

export const initialAuthState: AuthState = adapter.getInitialState({
  // additional entity state properties
  authUser: null,
  isLoading: false,
  isAuthenticated: false,
});

// export const initialAuthState: AuthState = {
//   authUser: null,
//   isLoading: false,
//   isAuthenticated: false,
// };

export function authReducer(
  state: AuthState = initialAuthState,
  action: AuthActions
) {
  switch (action.type) {
    case AuthActionsTypes.RegisterUserSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        authUser: action.payload,
      };
    }
    case AuthActionsTypes.LoginUserSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        authUser: action.payload,
      };
    }
    case AuthActionsTypes.LoginUserSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        authUser: action.payload,
      };
    }
    case AuthActionsTypes.LogoutUser:
      return {
        ...state,
        authUser: null,
        isLoading: false,
        isAuthenticated: false,
      };

    case AuthActionsTypes.GET_USER:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActionsTypes.GET_USER_SUCCESS:
      //action.payload.profileImageUrl += '?'+ new Date().getMilliseconds();
      return {
        ...state,
        authUser: action.payload,
      };

    default: {
      return state;
    }
  }
}

const selectAuthState = (state: AppState) => state.auth;
export const selectAuthUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.authUser.id
);
