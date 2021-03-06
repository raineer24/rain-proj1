import {
  ActionReducerMap,
  ActionReducer,
  createFeatureSelector,
  createSelector,
  createAction,
  createReducer,
  on,
  Action,
} from "@ngrx/store";
import { UserDetailsModel, UserCredentialsModel } from "../../core/models";
//import * as UserActions from "../actions/user.actions";
import { UserActions, UserActionTypes } from "../actions/user.actions";

export interface UserModuleState {
  userDATU: UserState;
}

export interface UserState {
  users: UserCredentialsModel[];
  selectedUser: UserCredentialsModel;
  pub: any;
  ourerror: string;
}

export const initialState: UserState = {
  users: null,
  selectedUser: null,
  pub: null,
  ourerror: null,
};

// export const initialState: UserState = {
//   user: null,
// };

export function userReducers(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.GetUsersSuccess: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case UserActionTypes.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload,
      };
    }
    case UserActionTypes.CLEAR_STATE: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
}

// export function user_reducer(state: UserState | undefined, action: Action) {
//   console.log("userReducer", state);
//   return userReducer(state, action);
// }

// export const getProfileState = createFeatureSelector<UserState>("users");

// export const getUsers = createSelector(getProfileState, (state) => {
//   console.log("State get users: ", state);
//   console.log("State get [users]: ", state.users);
//   state.users;
// });

// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );// export const getUsers = createSelector(
//   selectAuthState,
//   (state: AuthState) => state.users
// );
