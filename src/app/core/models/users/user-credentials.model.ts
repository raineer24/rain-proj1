export class UserCredentialsModel {
  id: string;
  email: string;
  password: string;
  token?: string;
  username: string;
  image_url: string;
}

export interface LoginUserQuery {
  email: string | null;
  password: string | null;
}
