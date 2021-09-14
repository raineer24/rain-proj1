import { NgModule } from "@angular/core";
import { MaterialModule } from "./materialize/materialize.module";
import { CommonModule } from "@angular/common";
import { LoadingBarComponent } from "./loading-bar/loading-bar.component";
@NgModule({
  declarations: [LoadingBarComponent],
  imports: [MaterialModule, CommonModule],
  exports: [LoadingBarComponent],
})
export class SharedModule {}
