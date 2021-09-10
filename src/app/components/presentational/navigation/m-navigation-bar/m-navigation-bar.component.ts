import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-m-navigation-bar",
  templateUrl: "./m-navigation-bar.component.html",
  styleUrls: ["./m-navigation-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavigationBarComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
}
