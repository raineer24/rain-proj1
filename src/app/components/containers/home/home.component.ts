import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
} from "@angular/core";
@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2><small>Recent Works.</small></h2>
    <div
      class="container"
      fxLayout="row fxLayoutWrap"
      fxLayout.xs="column"
      fxLayoutWrap
      fxLayoutGap="20px"
      fxLayoutAlign="space-evenly stretch"
      fxFlexFill
    >
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img mat-card-image class="img" src="https://i.imgur.com/Bc9Tdr8.jpg" />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img mat-card-image class="img" src="https://i.imgur.com/OfpgRS0.png" />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img mat-card-image class="img" src="https://i.imgur.com/VSGn1pS.png" />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img mat-card-image class="img" src="https://i.imgur.com/pslOsXE.jpg" />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img mat-card-image class="img" src="https://i.imgur.com/P0TK9PP.jpg" />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img
          mat-card-image
          class="img"
          src="https://raineerdelarita.files.wordpress.com/2013/03/rjbannerbrochure.jpg"
        />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img
          mat-card-image
          class="img"
          src="https://raineerdelarita.files.wordpress.com/2013/03/rjbannerbrochure2.jpg"
        />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img
          mat-card-image
          class="img"
          src="https://raineerdelarita.files.wordpress.com/2013/03/rjconstruction_03.png"
        />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img
          mat-card-image
          class="img"
          src="https://raineerdelarita.files.wordpress.com/2013/09/phil_03.jpg"
        />
      </mat-card>
      <mat-card fxFlex="0 1 calc(20% - 20px)" fxLayout="column" fxFlexFill>
        <img
          mat-card-image
          class="img"
          src="https://raineerdelarita.files.wordpress.com/2013/03/rjlogo.jpg"
        />
      </mat-card>
      <button mat-button color="accent" class="upTop" *ngIf="isShow">
        <mat-icon (click)="gotoTop()"> keyboard_arrow_up </mat-icon>
      </button>
    </div>`,
  styleUrls: ["./home.container.scss"],
})
export class HomeComponent {
  isShow: boolean;
  topPosToStartShowing = 79;

  @HostListener("window:scroll")
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    console.log("[scroll]", scrollPosition);
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
