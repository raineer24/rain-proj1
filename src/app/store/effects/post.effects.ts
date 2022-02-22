import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
// import * as AuthActions from "../../store/actions/auth.actions";
import { Posts, UserCredentialsModel, UserFetch } from "../../core/models/";
// import { UserState } from "../../store/reducers/user.reducer";
import { AppState } from "../../store/app.reducers";
import * as userActions from "../actions/user.actions";

import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
  exhaustMap,
  delay,
  withLatestFrom,
  filter,
  ignoreElements,
} from "rxjs/operators";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { merge, Observable, of } from "rxjs";
import { PostsService } from "../../core/services/posts.service";
import { AuthService } from "../../core/services/auth.service";
import { selectUserList } from "../app.reducers";

import {
  createPost,
  createPostSuccess,
  getPostSuccess,
} from "../actions/post.actions";
import { SetError } from "../actions/http-errors.actions";
import * as SpinnerActions from "../../store/actions/spinner.actions";
import * as PostsActions from "../../store/actions/post.actions";
import { generateAllPosts } from "../../store/app.reducers";
@Injectable()
export class PostEffects {
  constructor(
    private readonly actions$: Actions,
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      map((action) => action.post),
      switchMap((createPost) =>
        this.postsService.createPost(createPost).pipe(
          take(1),
          mergeMap((data) => [
            PostsActions.createPostSuccess({
              post: data["postData"],
            }),
            PostsActions.getAllPosts(),
          ]),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );

  createPostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostSuccess),
      map((action) => {
        PostsActions.opened;
        return {
          type: SpinnerActions.STOP_SPINNER,
        };
      })
    )
  );

  GetPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getAllPosts),
      mergeMap(() =>
        this.postsService.getPosts().pipe(
          map((post) => PostsActions.getPostSuccess({ post: post["posts"] })),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );
}
