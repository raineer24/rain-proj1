import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { skipWhile, skip, take, filter } from "rxjs/operators";
@Component({
  selector: "app-add-edu",
  templateUrl: "./add-edu.component.html",
  styleUrls: ["./add-edu.component.scss"],
})
export class AddEducationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
