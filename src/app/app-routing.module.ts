import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";
import { NetworkMembersComponent } from "./components/containers/network/network-members/network-members.component";
const routes: Routes = [
  { path: "", redirectTo: "/network", pathMatch: "full" },
  { path: "login", component: AuthPageComponent },
  {
    path: "network",
    component: NetworkMembersComponent,
    //canActivate: [AuthGuard],
    //data: { roles: ["User", "Admin"] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
