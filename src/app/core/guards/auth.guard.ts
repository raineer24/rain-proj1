import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as fromApp from "../../store/app.state";
import { filter, map, take, tap } from "rxjs/operators";
//import { getAuthInfoState } from "../../store/app.reducers";
import { AppState } from "../../store/app.reducers";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log("AuthGuard.canActivate()");
    return this.store
      .select((s) => !!s.auth.isAuthenticated)
      .pipe(
        tap((isAuthenticated) => {
          console.log("s", isAuthenticated);
          if (!isAuthenticated) {
            this.router.navigateByUrl("/login");
            // this.store.dispatch(
            //   LoginActions.loginGuardFailure({ error: null })
            // );
          }
        })
      );
  }
}
