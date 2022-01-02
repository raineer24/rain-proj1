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
import { MatTableDataSource } from "@angular/material/table";
import { UserDetailsModel, UserCredentialsModel } from "../../../core/models";
import { AppState } from "../../../store/app.state";
import { Store, select } from "@ngrx/store";
//import { UsersListItemDto } from "src/app/models/models";
import {
  getUser,
  deleteExpProfile,
  deleteEduProfile,
  loadUsers,
} from "../../../store/actions/auth.actions";

@Component({
  selector: "app-users-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["users-list.component.scss"],
  template: ` <h2>USERS LIST COMPONENT</h2>
    <mat-card>
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
              <td
                mat-cell
                *matCellDef="let row"
                [routerLink]="['/dev/', row.id]"
                (click)="onUserSelected(row.id)"
              >
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
  displayedColumns = ["username", "email", "image_url", "id"];
  id: string;
  @Input() users: UserCredentialsModel[];
  // @Input() users: UsersListItemDto[];
  @Output() userSelected = new EventEmitter<string>();

  constructor(private store: Store<AppState>) {}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    console.log("thisusers", this.users);
    this.dataSource.data = this.users;
    console.log("dta", this.dataSource);

    // this.dataSource.filterPredicate = (data: any, filter) => {
    //   const dataStr = JSON.stringify(data).toLowerCase();
    //   return dataStr.indexOf(filter) != -1;
    // };

    this.dataSource.filterPredicate = (data, filter) => {
      return data.email.indexOf(filter) != -1;
    };
  }

  onUserSelected(id: string) {
    console.log("click");

    this.store.dispatch(getUser({ id }));
    //console.log("dataSOURUCE", this.users);
    // const path = `/workspace/users/${userId}`;
    //  this.store.dispatch(fromRouter.go({ path: [path] }));
  }

  ngOnChanges() {}
}
