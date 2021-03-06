import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { SharedModule } from "./shared/shared.module";
import { UserComponent } from "./components/containers/user/user.container";
import { CreateProfileComponent } from "./components/containers/create-profile/create-profile.component";
import { AppDropdownComponent } from "./components/containers/create-profile/app-dropdown/app-dropdown.component";
import { StoreModule, MetaReducer, META_REDUCERS } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { LoginFormComponent } from "./components/presentational/auth/login-form/login-form.component";
import { MaterialModule } from "./shared/materialize/materialize.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppEffects } from "./store/app.effects";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import * as fromApp from "./store/app.reducers";
import { JwtInterceptor } from "./core/guards/jwt.interceptor";
import { AddExperienceComponent } from "./components/containers/add-exp/add-exp.component";
import { AddEducationComponent } from "./components/containers/add-edu/add-edu.component";
import { RegisterPageComponent } from "./components/containers/auth/register-page/register-page.component";
import { RegisterFormComponent } from "./components/presentational/auth/register-form/register-form.component";
import { UsersListComponent } from "./components/presentational/users-list/users-list.component";
import { UserDetailComponent } from "./components/presentational/user-detail/user-detail.component";
import { UsersListContainerComponent } from "./components/containers/users-list-container/users-list-container.component";
import { UserDetailContainerComponent } from "./components/containers/user-detail-container/user-detail-container.component";
import { UserPostComponent } from "./components/containers/posts/user-post.container";
import { PostCreateComponent } from "./components/containers/posts/post-create/post-create.component";
import { PostsListComponent } from "./components/containers/posts/post-list/posts-list.component";
import { HomeComponent } from "./components/containers/home/home.component";
import { FlexLayoutModule } from "@angular/flex-layout";

// a Meta reducer from ngx-localStorage (syncing store with storage).
import { AppReducers, metaReducers } from "./store/app.reducers";
// const metaReducers: Array<MetaReducer<any, any>> = [
//   fromApp.localStorageSyncReducer,
// ];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    UserComponent,
    LoginFormComponent,
    RegisterPageComponent,
    AddExperienceComponent,
    AddEducationComponent,
    RegisterFormComponent,
    CreateProfileComponent,
    AppDropdownComponent,
    UsersListComponent,
    UsersListContainerComponent,
    UserDetailComponent,
    UserDetailContainerComponent,
    UserPostComponent,
    PostCreateComponent,
    PostsListComponent,
    HomeComponent,
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
    StoreModule.forRoot(AppReducers, { metaReducers }),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 42,
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    /*
      provide: META_REDUCERS,
      deps: [NGXLogger],
      useFactory: loggerFactory,
      multi: true
    },
    */
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
