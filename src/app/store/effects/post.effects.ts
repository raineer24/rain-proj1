import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { Router } from "@angular/router";
// import * as AuthActions from "../../store/actions/auth.actions";
import { UserCredentialsModel, UserFetch } from "../../core/models/";
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
} from "rxjs/operators";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { merge, Observable, of } from "rxjs";
import { PostsService } from "../../core/services/posts.service";
import { selectUserList } from "../app.reducers";
import { createPost, createPostSuccess } from "../actions/post.actions";
import { SetError } from "../actions/http-errors.actions";
import * as SpinnerActions from "../../store/actions/spinner.actions";
import * as PostsActions from "../../store/actions/post.actions";

@Injectable()
export class PostEffects {
  constructor(
    private readonly actions$: Actions,
    private postsService: PostsService,
    // private actions$: Actions,
    private router: Router,
    private store: Store<AppState>
  ) {}

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPost),
      map((action) => action.post),
      mergeMap((createPost) =>
        this.postsService.createPost(createPost).pipe(
          map((data) => {
            console.log("data", data);

            return createPostSuccess({ post: data["data"] });
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
}
