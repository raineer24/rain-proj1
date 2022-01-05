import { createAction, createReducer, on, Action } from "@ngrx/store";
import { UserDetailsModel } from "../../core/models";

//Action
export const loadUser = createAction(
  "[Users Management] Load User",
  (userId: string) => ({
    userId,
    showLoader: true,
  })
);

export const loadUserSuccess = createAction(
  "[Users Management] Load User Success",
  (viewModel: UserDetailsModel) => ({
    viewModel,
    triggerAction: loadUser.type,
  })
);

export const loadUserFail = createAction(
  "[Users Management] Load User Fail",
  (error: any) => ({
    error,
    triggerAction: loadUser.type,
  })
);

export interface UserState {
  user: UserDetailsModel;
}

export const initialState: UserState = {
  user: null,
};

export const cartReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state, { viewModel }) => {
    const user = viewModel;

    return {
      ...state,
      user,
    };
  })
);
