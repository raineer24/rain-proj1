import { NgModule } from "@angular/core";
import { MaterialModule } from "./materialize/materialize.module";
import { CommonModule } from "@angular/common";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
@NgModule({
  declarations: [LoadingBarComponent, HeaderComponent],
  imports: [MaterialModule, CommonModule, RouterModule],
  exports: [LoadingBarComponent, HeaderComponent],
})
export class SharedModule {}
