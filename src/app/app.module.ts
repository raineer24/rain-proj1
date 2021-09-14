import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppReducers } from "./store/app.reducers";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { SharedModule } from "./shared/shared.module";
import { MainNavigationBarComponent } from "./components/presentational/navigation/m-navigation-bar/m-navigation-bar.component";
import { NavigationBarComponent } from "./components/containers/navigation/navigation-bar/navigation-bar.component";
import { NetworkMembersComponent } from "./components/containers/network/network-members/network-members.component";
import { UserComponent } from "./components/containers/user/user.container";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainNavigationBarComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 42,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
