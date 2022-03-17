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
  template: ` <h2>USERS LIST COMPONENT</h2>
    <mat-card>
      <mat-spinner *ngIf="isLoading$ | async" class="mx-auto"></mat-spinner>
      <mat-card-content
        fxLayout="column"
        fxFlexAlign="center center"
        fxLayoutGap="20px"
      >
        <div fxLayout="row wrap" fxLayoutAlign="center center">
          test
          <table mat-table [dataSource]="dataSource">
            <ng-container matColumnDef="username">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>
                Username
              </th>
              <td mat-cell *matCellDef="let row">{{ row.username }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
              <td mat-cell *matCellDef="let row">{{ row.email }}</td>
            </ng-container>

            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
              <td mat-cell *matCellDef="let row" (click)="viewUser(row.id)">
                View PRofile
              </td>
            </ng-container>

            <ng-container matColumnDef="image_url">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let element">
                <img
                  class="mr-1 rounded-circle"
                  src="{{ element.image_url }}"
                  style="width: 26px;height: 26px;"
                />
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table></div></mat-card-content
    ></mat-card>`,
})
export class UsersListComponent implements OnInit, OnChanges {
  dataSource = new MatTableDataSource<UserCredentialsModel>();
  isLoading$: Observable<boolean>;
  displayedColumns = ["username", "email", "image_url", "id"];
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
