import { Component, OnInit } from "@angular/core";
import { MenuItem } from "../../core/models/menu-item";
@Component({
  selector: "app-responsive-toolbar",
  templateUrl: "./responsive-toolbar.component.html",
  styleUrls: ["./responsive-toolbar.component.scss"],
})
export class ResponsiveToolbarComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: "Sign Up",
      icon: "app_registration",
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      routerLink: "register",
    },
    {
      label: "Login",
      icon: "login",
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      routerLink: "login",
    },
    {
      label: "Posts",
      icon: "notes",
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      routerLink: "posts",
    },
    {
      label: "Showcase",
      icon: "slideshow",
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      routerLink: "home",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
