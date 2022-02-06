import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  styleUrls: ["header.component.scss"],
  template: ` <div
    class="container"
    fxLayout="column"
    fxLayout.xs="column"
    fxLayoutAlign="center"
    fxLayoutGap="0px"
    fxLayoutGap.xs="0"
  >
    <div class="item header-content" fxFlex="100%" fxFlexOffset.xs="0">
      <mat-toolbar>
        <span mat-card-avatar class="example-header-image"></span>
        <span>Social Media Management</span>
        <span class="example-spacer"></span>
        <button mat-button routerLink="/"><mat-icon>home</mat-icon></button>
        <button mat-button routerLink="/posts">
          <span class="material-icons">post_add</span>
        </button>
        <button mat-button routerLink="/dev">
          <span class="material-icons">people</span>
        </button>
      </mat-toolbar>
    </div>
  </div>`,
})
export class HeaderComponent {
  @Input() isSigningUpEnabled: boolean;
}
