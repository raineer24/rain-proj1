import {
  Component,
  HostListener,
  ChangeDetectionStrategy,
} from "@angular/core";
@Component({
  selector: "app-home",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-users-list [users]="users$"> </app-users-list> `,
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
