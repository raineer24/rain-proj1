import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppReducers } from "./store/app.reducers";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { SharedModule } from "./shared/shared.module";
import { UserComponent } from "./components/containers/user/user.container";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { LoginFormComponent } from "./components/presentational/auth/login-form/login-form.component";
import { MaterialModule } from "./shared/materialize/materialize.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppEffects } from "./store/app.effects";

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    UserComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 42,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
