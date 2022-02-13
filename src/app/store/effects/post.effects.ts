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
  filter
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
    // private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  readonly loadPostsIfNotLoaded$ = createEffect(() => {
    return this.actions$.pipe(
      // when the songs page is opened
      ofType(PostsActions.opened),
      // then select songs from the store
         withLatestFrom((() => this.store.select(generateAllPosts)),
      // and check if the songs are loaded
      filter(([, songs]) => !songs),
      // if not, load songs from the API
      exhaustMap(() => {
        return this.songsService.getSongs().pipe(
          map((songs) => songsApiActions.songsLoadedSuccess({ songs })),
          catchError((error: { message: string }) =>
            of(songsApiActions.songsLoadedFailure({ error }))
          )
        );
      })
    );
  });

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      map((action) => action.post),
      switchMap((createPost) =>
        this.postsService.createPost(createPost).pipe(
          map((data) => {
            console.log("data", data);

            return createPostSuccess({ post: data["postData"] });
          }),
          catchError((error) => of(new SetError(error)))
        )
      )
    )
  );

  createPostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPostSuccess),
      map((action) => {
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

  @Effect()
  getPosts$ = this.actions$.pipe(
    ofType(PostsActions.getAllPosts),
    switchMap(() => {
      return this.postsService.getPosts().pipe(
        map((data) => {
          console.log("data", data);
          return getPostSuccess({ post: data["posts"] });
        })
      );
    })
  );
}
