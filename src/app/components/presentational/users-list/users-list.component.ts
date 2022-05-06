import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { UserDetailsModel, UserCredentialsModel } from "../../../core/models";
import { AppState } from "../../../store/app.reducers";
import { Store, select } from "@ngrx/store";
//import { UsersListItemDto } from "src/app/models/models";
import { getUser } from "../../../store/actions/user.actions";
import { ActivatedRoute, Router } from "@angular/router";
import * as SpinnerActions from "../../../store/actions/spinner.actions";
import { isLoading } from "../../../store/app.reducers";
@Component({
  selector: "app-users-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["users-list.component.scss"],
  templateUrl: "./users-list.component.html",
})
export class UsersListComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<UserCredentialsModel>();
  isLoading$: Observable<boolean>;
  displayedColumns = ["image_url", "username", "email", "id"];
  id: string;
  //@Input() users: UserCredentialsModel[];
  @Input() users;
  // @Input() users: UsersListItemDto[];
  @Output() userSelected = new EventEmitter<string>();

  constructor(private store: Store<AppState>, private router: Router) {}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    console.log("thisusers", this.users);
    this.users.subscribe((data) => {
      console.log("DATA", data);
      this.dataSource.data = data;
    });
    //this.store.dispatch(SpinnerActions.startSpinner());
    this.isLoading$ = this.store.pipe(select(isLoading));
    // console.log("dta", this.dataSource);

    // this.dataSource.filterPredicate = (data: any, filter) => {
    //   const dataStr = JSON.stringify(data).toLowerCase();
    //   return dataStr.indexOf(filter) != -1;
    // };

    this.dataSource.filterPredicate = (data, filter) => {
      return data.email.indexOf(filter) != -1;
    };
  }

  viewUser(id: string) {
    console.log("click");
    this.router.navigate([`dev/${id}`]);

    //this.store.dispatch(getUser({ id }));
    //console.log("dataSOURUCE", this.users);
    // const path = `/workspace/users/${userId}`;
    //  this.store.dispatch(fromRouter.go({ path: [path] }));
  }

  ngOnChanges() {}
}
