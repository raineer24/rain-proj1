import { Component, OnInit } from "@angular/core";
import { MenuItem } from "../../core/models/menu-item";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { AppState } from "../../store/app.reducers";
import { logout } from "../../store/actions/auth.actions";
@Component({
  selector: "app-responsive-toolbar",
  templateUrl: "./responsive-toolbar.component.html",
  styleUrls: ["./responsive-toolbar.component.scss"],
})
export class ResponsiveToolbarComponent implements OnInit {
  isloggedIn$: Observable<boolean>;

  menuItems: MenuItem[] = [
    {
      label: "Sign Up",
      icon: "app_registration",

      routerLink: "register",
      onlyForLogged: false,
      alwaysShow: false,
      show: true,
    },
    {
      label: "Login",
      icon: "login",

      routerLink: "login",
      onlyForLogged: false,
      alwaysShow: false,
      show: true,
    },
    {
      label: "Users",
      icon: "people",

      routerLink: "dev",
      onlyForLogged: false,
      alwaysShow: true,
      show: true,
    },
    {
      label: "Showcase",
      icon: "slideshow",

      routerLink: "home",
      onlyForLogged: false,
      alwaysShow: true,
      show: true,
    },
    {
      label: "Posts",
      icon: "notes",

      routerLink: "posts",
      onlyForLogged: true,
      alwaysShow: false,
      show: true,
    },
  ];

  constructor(private store: Store<AppState>) {
    this.isloggedIn$ = this.store.select(
      (state) => state["auth"].isAuthenticated
    );
  }

  ngOnInit(): void {
    console.log(this.menuItems);
    console.log("isloggedin", this.isloggedIn$);
  }

  logoutx() {
    console.log("clicked");
    this.store.dispatch(logout());
  }
}
