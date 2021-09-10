import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, AuthPageComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
