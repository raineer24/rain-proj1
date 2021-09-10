import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent implements OnInit {
  ngOnInit(): void {}
}
