import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { UserComponent } from "./components/containers/user/user.container";
import { RegisterPageComponent } from "./components/containers/auth/register-page/register-page.component";
const routes: Routes = [
  { path: "login", component: AuthPageComponent },
  { path: "register", component: RegisterPageComponent },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
    //data: { roles: ["User", "Admin"] },
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
