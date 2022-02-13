import { Posts } from "../../core/models";
import { createAction, props } from "@ngrx/store";

export const CREATE_POST = "[CREATE POST PAGE] CREATE_POST";
export const CREATE_POST_SUCCESS = "[CREATE POST PAGE] CREATE_POST_SUCCESS";
export const CREATE_POST_FAILED = "[CREATE POST PAGE] CREATE_POST_FAILED";

export const opened = createAction("[Posts Page] Opened");

//export const GET_POST = "[ POST ]";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILED = "GET_POST_FAILED";

export const createPost = createAction(
  CREATE_POST,
  props<{ post: FormData }>()
);

export const createPostSuccess = createAction(
  CREATE_POST_SUCCESS,
  props<{ post: any }>()
);

//export const getPost = createAction(GET_POST);

export const getAllPosts = createAction("[Post] Get Posts all Posts");

export const getPostSuccess = createAction(
  GET_POST_SUCCESS,
  props<{ post: any }>()
);

export const createPostFailed = createAction(CREATE_POST_FAILED);
