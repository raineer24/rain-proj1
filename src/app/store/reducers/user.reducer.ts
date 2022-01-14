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

// export interface UserState {
//   user: {
//     id: 0;
//     appUserId: "";
//     currentTab: 0;
//     alphaColor: "#FF6872;";
//     status: "";
//     username: "";
//     name: "";
//     surname: "";
//     profileImageUrl: "";
//     followingState: 2;
//     currentUserFollowedState: 2;
//     followerCount: 0;
//     followingCount: 0;
//     interestCount: 0;
//     totalReputation: 0;
//     collectionCount: 0;
//   };
// }

//  id: string;
//   email: string;
//   username: string;
//   first_name: string;
//   user_profile: UserFetch[];
export const initialState: UserState = {
  user: null,
};

// export const initialState: UserState = {
//   user: null,
// };

export const userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state, { viewModel }) => {
    const user = viewModel;

    return {
      ...state,
      user,
    };
  })
);
