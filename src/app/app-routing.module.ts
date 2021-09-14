import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { NetworkMembersComponent } from "./components/containers/network/network-members/network-members.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { UserComponent } from "./components/containers/user/user.container";
const routes: Routes = [
  { path: "", redirectTo: "/user", pathMatch: "full" },
  { path: "login", component: AuthPageComponent },
  {
    path: "user",
    component: UserComponent,
    //canActivate: [AuthGuard],
    //data: { roles: ["User", "Admin"] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
