import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { SharedModule } from "./shared/shared.module";
import { UserComponent } from "./components/containers/user/user.container";
import { CreateProfileComponent } from "./components/containers/create-profile/create-profile.component";
import { StoreModule, MetaReducer } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { LoginFormComponent } from "./components/presentational/auth/login-form/login-form.component";
import { MaterialModule } from "./shared/materialize/materialize.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppEffects } from "./store/app.effects";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import * as fromApp from "./store/app.reducers";
import { RegisterPageComponent } from "./components/containers/auth/register-page/register-page.component";
import { RegisterFormComponent } from "./components/presentational/auth/register-form/register-form.component";
import { FlexLayoutModule } from "@angular/flex-layout";
// a Meta reducer from ngx-localStorage (syncing store with storage).
const metaReducers: Array<MetaReducer<any, any>> = [
  fromApp.localStorageSyncReducer,
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    UserComponent,
    LoginFormComponent,
    RegisterPageComponent,
    RegisterFormComponent,
    CreateProfileComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(fromApp.AppReducers, { metaReducers }),
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
