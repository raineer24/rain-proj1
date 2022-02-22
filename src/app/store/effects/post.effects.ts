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
  PostActionTypes,
  GetPostsAction,
  GetPostsSuccessAction,
  GetPostsFailAction,
} from "../actions/post.actions";
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
    // private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // loadAll = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(DeviceUiActions.init),
  //       switchMap((action) =>
  //         of(action).pipe(withLatestFrom(this.store.pipe(select(devices))))
  //       ),
  //       filter(([, actualDevices]) => actualDevices === undefined),
  //       switchMap(() => this.deviceService.findAll()),
  //       ignoreElements()
  //     ),
  //   { dispatch: false }
  // );

  // loadAll = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(PostsActions.getAllPosts),
  //       switchMap((action) =>
  //         of(action).pipe(
  //           withLatestFrom(this.store.pipe(select(generateAllPosts)))
  //         )
  //       ),
  //       filter(([, posts]) => posts === undefined),
  //       switchMap(() => this.postsService.PostsAll()),
  //       ignoreElements()
  //     )
  //   //{ dispatch: false }
  // );

  // addPost$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(createPost),
  //     map((action) => action.post),
  //     switchMap((createPost) =>
  //       this.postsService.createPost(createPost).pipe(
  //         map((data) => {
  //           console.log("data", data);

  //           return createPostSuccess({ post: data["postData"] });
  //         }),
  //         catchError((error) => of(new SetError(error)))
  //       )
  //     )
  //   )
  // );

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

  // @Effect() onGetUnpublishedPost$: Observable<Action> =
  // this.actions$.ofType<addpostActions.GetUnpublishedPost>(addpostActions.AddNewPostActionTypes.GET_UNPUBLISHED_POST)
  // .switchMap((action) => {
  //     return this.addNewPostService
  //     .GetUserUnpublishedPost()
  //     .map(data => {
  //         return new addpostActions.GetUnpublishedPostSuccess(data.value);
  //       })
  //       .catch((error) => {
  //         return Observable.of(
  //           new addpostActions.GetUnpublishedPostFail({error:error})
  //         );
  //       });

  // @Effect()
  // getPosts$ = this.actions$.pipe(
  //   ofType(PostsActions.getAllPosts),
  //   switchMap(() => {
  //     return this.postsService.getPosts().pipe(
  //       map((data) => {
  //         console.log("data", data);
  //         return getPostSuccess({ post: data["posts"] });
  //       })
  //     );
  //   })
  // );

  // getPost$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PostsActions.getAllPosts),

  //     // instead of returning an empty operator in catchError, let's return an empty array
  //     switchMap(() =>
  //       this.postsService
  //         .getPosts()
  //         .pipe(catchError((error) => of(new SetError(error))))
  //     ),

  //     // the main problem in your code was this "payload: books"; use, instead, "payload: {books}"
  //     map((data) => getPostSuccess({ post: data["posts"] }))
  //   )
  // );

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

  // @Effect() getPosts$ = this.actions$.pipe(
  //   ofType<GetPostsAction>(PostActionTypes.GET_POSTS),
  //   mergeMap(() =>
  //     this.postsService.getPosts().pipe(
  //       map((data) => {
  //         console.log("efx data", data["posts"]);
  //         return new GetPostsSuccessAction(data["posts"]);
  //       }),
  //       catchError((error) => of(new GetPostsFailAction(error)))
  //     )
  //   )
  // );
}
