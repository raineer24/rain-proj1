import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { SharedModule } from "./shared/shared.module";
import { MainNavigationBarComponent } from "./components/presentational/navigation/m-navigation-bar/m-navigation-bar.component";

@NgModule({
  declarations: [AppComponent, AuthPageComponent, MainNavigationBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
