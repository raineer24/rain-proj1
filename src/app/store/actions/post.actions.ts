import { Posts } from "../../core/models";
import { createAction, props } from "@ngrx/store";

export const CREATE_POST = "[CREATE POST PAGE] CREATE_POST";
export const CREATE_POST_SUCCESS = "[CREATE POST PAGE] CREATE_POST_SUCCESS";
export const CREATE_POST_FAILED = "[CREATE POST PAGE] CREATE_POST_FAILED";

export const createPost = createAction(
  CREATE_POST,
  props<{ post: FormData }>()
);

export const createPostSuccess = createAction(
  CREATE_POST_SUCCESS,
  props<{ post: Posts }>()
);

export const createPostFailed = createAction(CREATE_POST_FAILED);
