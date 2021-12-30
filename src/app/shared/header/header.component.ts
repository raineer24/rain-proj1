import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  styleUrls: ["header.component.scss"],
  template: ` <a routerLink="dev">test</a> `,
})
export class HeaderComponent {
  @Input() isSigningUpEnabled: boolean;
}
