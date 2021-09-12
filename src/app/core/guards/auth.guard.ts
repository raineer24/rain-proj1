import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { filter, map, take } from "rxjs/operators";
import { selectAuthUser } from "../../store/reducers/auth.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // this.store.dispatch(new GetCurrentUser(true));
    return this.store.pipe(
      select(selectAuthUser),
      filter((user) => !!user),
      map((user) => {
        if (!user) {
          this.router.navigateByUrl("/login");
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
