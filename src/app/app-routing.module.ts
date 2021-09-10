import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthPageComponent } from "./components/containers/auth/auth-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: AuthPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
