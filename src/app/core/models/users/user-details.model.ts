import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { UserFetch } from "../../models";

export class UserDetailsModel {
  id: string;
  email: string;
  username: string;
  first_name: string;
  user_profile: UserFetch[];
}
