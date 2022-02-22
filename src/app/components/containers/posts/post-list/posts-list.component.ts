import { Component, OnInit, OnDestroy } from "@angular/core";
import { Posts } from "../../../../core/models/posts";
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "../../../../core/services/posts.service";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Subscription, Observable, of, Subject } from "rxjs";
import { AppState } from "../../../../store/app.reducers";
import { getAllPosts } from "../../../../store/actions/post.actions";
import * as PostActions from "../../../../store/actions/post.actions";
import { generateAllPosts, isLoading$ } from "../../../../store/app.reducers";
import { GetPostsAction } from "../../../../store/actions/post.actions";
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
} from "rxjs/operators";
import { cloneDeep } from "lodash";
@Component({
  selector: "posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  // posts: Posts[];
  storeSub!: Subscription;
  datus: any;
  loading$: Observable<Boolean>;
  $postAppsSubscription: Observable<string>;

  posts$: Observable<Posts[]>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}
  ngOnInit() {
    this.store.dispatch(getAllPosts());
    this.posts$ = this.store.select((store) => store.posts.posts);

    this.store.pipe(select(generateAllPosts), take(1)).subscribe((data) => {
      console.log("data", data);
    });
  }
  ngOnDestroy() {}
}
