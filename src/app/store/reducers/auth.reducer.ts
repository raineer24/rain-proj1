import { UserDetailsModel, UserFetch } from "../../core/models";
import { AuthActions, AuthActionsTypes } from "../actions/auth.actions";
import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";

export interface AuthState extends EntityState<UserDetailsModel> {
  authUser: UserDetailsModel;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const adapter: EntityAdapter<UserDetailsModel> =
  createEntityAdapter<UserDetailsModel>();

export const userProfileAdapter: EntityAdapter<UserFetch> =
  createEntityAdapter<UserFetch>({
    selectId: (userprofile) => userprofile.id,
  });

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
    case AuthActionsTypes.CREATE_PROFILE_SUCCESS: {
      return {
        ...adapter.updateOne(
          {
            id: action.payload.id,
            changes: {},
          },
          state
        ),
      };
    }
    case AuthActionsTypes.UPDATE_PROFILE_SUCCESS: {
      console.log("update profile success", action.payload.payload.userp);
      console.log("STATE", state);
      return {
        ...adapter.updateOne(
          {
            id: action.payload.payload.userp.id,
            changes: {
              user_profile: action.payload.payload.userp,
            },
          },
          state
        ),
      };
    }

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
  (state: AuthState) => state.authUser
);

export const selectAuthUserProfile = createSelector(
  selectAuthState,
  (state: AuthState) => state.authUser.user_profile
);

export const selectAuthUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.authUser.id
);
