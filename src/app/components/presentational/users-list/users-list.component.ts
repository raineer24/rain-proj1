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

//import { UsersListItemDto } from "src/app/models/models";

@Component({
  selector: "app-users-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["users-list.component.scss"],
  template: ` <h2>USERS LIST COMPONENT</h2> `,
})
export class UsersListComponent implements OnInit, OnChanges {
  // dataSource = new MatTableDataSource<UsersListItemDto>();
  displayedColumns = ["userName", "email", "learningPath", "roles", "status"];

  // @Input() users: UsersListItemDto[];
  @Output() userSelected = new EventEmitter<string>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {}

  ngOnChanges() {}
}
