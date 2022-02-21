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
@Component({
  selector: "posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"],
})
export class PostsListComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  posts: Posts[];
  storeSub!: Subscription;
  datus: any;
  $postAppsSubscription: Observable<string>;
  public posts$: Observable<Posts[]> = this.store.pipe(
    select(generateAllPosts)
  );
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}
  ngOnInit() {
    this.isLoading$ = this.store.select(isLoading$);
    this.store.dispatch(getAllPosts());
    // this.store.pipe(select(generateAllPosts), take(1)).subscribe((data) => {
    //   console.log("data", data);
    //   //this.posts$ = data;
    // });

    // this.store.pipe(
    //   select((state) => state.posts.posts),
    //   filter((details) => !!details),
    //   take(1)
    // );

    // this.store.dispatch(PostActions.opened());
    this.posts$.subscribe((data) => {
      console.log("this.posts", this.posts);
      this.posts = data;
    });

    // this.store
    //   .select(generateAllPosts)
    //   .pipe(
    //     tap((songs) => {
    //       // if the songs are not loaded
    //       // if (!songs) {
    //       //   // then dispatch the `loadSongs` action
    //       //   this.store.dispatch(getAllPosts());
    //       // }
    //       this.store.dispatch(getAllPosts());
    //     }),
    //     take(1)
    //   )
    //   .subscribe((data) => {
    //     console.log("data post", this.posts$);
    //     this.posts$ = data;
    //   });
  }
  ngOnDestroy() {}
}
