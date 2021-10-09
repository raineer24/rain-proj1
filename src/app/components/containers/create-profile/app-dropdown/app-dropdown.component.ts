import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
export interface Positions {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-dropdown",
  templateUrl: "./app-dropdown.component.html",
  styleUrls: ["./app-dropdown.component.scss"],
})
export class AppDropdownComponent implements OnInit {
  @Input() isDisabled: any;
  @Input() basicForm: FormGroup;
  jobTitle: Positions[];
  @Output() jobSelected: EventEmitter<any> = new EventEmitter();
  @Input() selected: string;

  @Input() set status(positions: string) {
    this.jobTitle = this.getPositions();
    console.log("jobTitle", this.jobTitle);
  }
  constructor(private fb: FormBuilder) {}
  ngOnInit() {}

  getPositions(): Positions[] {
    return [
      { value: "senior developer", viewValue: "senior Developer" },
      { value: "junior developer", viewValue: "junior Developer" },
      { value: "manager", viewValue: "manager" },
      { value: "instructor", viewValue: "instructor" },
      { value: "intern", viewValue: "intern" },
      { value: "student", viewValue: "student" },
      { value: "Other", viewValue: "Other" },
    ];
  }

  onChangeJob(value) {
    this.jobSelected.emit(value);
    //let jobValue = this.jobSelected.emit(value);
    //console.log("clicked", jobValue);
  }
}
