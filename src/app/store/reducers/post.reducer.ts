import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Posts } from "../../core/models";
import { createReducer, on } from "@ngrx/store";
import * as PostActions from "../actions/post.actions";

export interface PostState extends EntityState<Posts> {
  selectPostId: string;
}

export const selectPostId = (post: Posts) => post.blog_id;

export const adapter = createEntityAdapter<Posts>({
  selectId: selectPostId,
});

export const initPostsState = adapter.getInitialState();

export const postReducer = createReducer(
  initPostsState,
  on(PostActions.createPostSuccess, (state, action) => {
    return adapter.addOne(action.post, { ...state });
  })
);
