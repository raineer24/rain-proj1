import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { UserComponent } from "./components/containers/user/user.container";
import { UsersListContainerComponent } from "./components/containers/users-list-container/users-list-container.component";
import { RegisterPageComponent } from "./components/containers/auth/register-page/register-page.component";
import { CreateProfileComponent } from "./components/containers/create-profile/create-profile.component";
import { AddExperienceComponent } from "./components/containers/add-exp/add-exp.component";
import { AddEducationComponent } from "./components/containers/add-edu/add-edu.component";
import { UserDetailComponent } from "./components/presentational/user-detail/user-detail.component";
import { UserDetailContainerComponent } from "./components/containers/user-detail-container/user-detail-container.component";
import { Router, ActivatedRoute } from "@angular/router";
import { UserPostComponent } from "./components/containers/posts/user-post.container";
const routes: Routes = [
  { path: "login", component: AuthPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "add", component: CreateProfileComponent },
  { path: "dev", component: UsersListContainerComponent },
  { path: "dev/:id", component: UserDetailContainerComponent },
  { path: "user/edit/:id", component: CreateProfileComponent },
  { path: "user/add-exp", component: AddExperienceComponent },
  { path: "user/add-edu", component: AddEducationComponent },
  { path: "posts", component: UserPostComponent },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  { path: "", redirectTo: "/user", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
