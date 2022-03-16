import { NgModule } from "@angular/core";
import { MaterialModule } from "./materialize/materialize.module";
import { CommonModule } from "@angular/common";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { ResponsiveToolbarComponent } from "./responsive-toolbar/responsive-toolbar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    LoadingBarComponent,
    HeaderComponent,
    ResponsiveToolbarComponent,
  ],
  imports: [MaterialModule, CommonModule, RouterModule, FlexLayoutModule],
  exports: [LoadingBarComponent, HeaderComponent, ResponsiveToolbarComponent],
})
export class SharedModule {}
