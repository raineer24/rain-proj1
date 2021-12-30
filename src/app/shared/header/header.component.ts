import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  styleUrls: ["header.component.scss"],
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row class="mat-toolbar-row-top" fxLayout>
        <div fxFlex fxLayout fxLayoutAlign="flex-end">
          <ul fxLayout class="navigation-items">
            <li>
              <a routerLink="/auth/login">Log in</a>
            </li>
            <li>
              <a routerLink="/auth/login">Developers</a>
            </li>
            <li *ngIf="isSigningUpEnabled">
              <a class="border" routerLink="/signing-up/organization/init"
                >Sign up</a
              >
            </li>
          </ul>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  @Input() isSigningUpEnabled: boolean;
}
