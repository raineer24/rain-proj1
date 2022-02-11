import { EntityState, createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Posts } from "../../core/models";
import { createReducer, on } from "@ngrx/store";
import * as PostActions from "../actions/post.actions";

export interface PostState extends EntityState<Posts> {
  selectPostId: string;
}

export const selectPostId = (post: Posts) => post.id;

export const adapter: EntityAdapter<Posts> = createEntityAdapter<Posts>({
  selectId: (post: Posts) => post.id,
});

export const initPostsState = adapter.getInitialState();

export const initialState: PostState = adapter.getInitialState({
  selectPostId: null,
});

export const postReducer = createReducer(
  initialState,
  on(PostActions.createPostSuccess, (state, action) => {
    return adapter.addOne(action.post, { ...state });
  })
);
