import { Component, OnInit } from "@angular/core";
import { MenuItem } from "../../core/models/menu-item";
import { Store, select, ActionsSubject } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { AppState } from "../../store/app.reducers";
@Component({
  selector: "app-responsive-toolbar",
  templateUrl: "./responsive-toolbar.component.html",
  styleUrls: ["./responsive-toolbar.component.scss"],
})
export class ResponsiveToolbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  menuItems: MenuItem[] = [
    {
      label: "Sign Up",
      icon: "app_registration",
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      routerLink: "register",
      onlyForLogged: false,
      alwaysShow: true,
    },
    {
      label: "Login",
      icon: "login",
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      routerLink: "login",
      onlyForLogged: false,
      alwaysShow: true,
    },
    {
      label: "Posts",
      icon: "notes",
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      routerLink: "posts",
      onlyForLogged: true,
      alwaysShow: true,
    },
    {
      label: "Showcase",
      icon: "slideshow",
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      routerLink: "home",
      onlyForLogged: false,
      alwaysShow: true,
    },
    {
      label: "Users",
      icon: "people",
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      routerLink: "dev",
      onlyForLogged: false,
      alwaysShow: true,
    },
  ];

  constructor(private store: Store<AppState>) {
    this.loggedIn$ = this.store.select(
      (state) => state["auth"].isAuthenticated
    );
  }

  ngOnInit(): void {
    console.log(this.menuItems);
    console.log(this.loggedIn$);
  }
}
