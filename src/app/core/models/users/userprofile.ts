export interface UserFetch {
  id: string;
  company_name: string;
  website: string;
  job_location: string;
  status: string;
  bio: string;
  youtube_handle: string;
  twitter_handle: string;
  facebook_handle: string;
  instagram_handle: string;
  areas_of_expertise: string;
  user_education?: Array<any>;
  user_experience?: Array<any>;
  user_profile?: Array<any>;
  user_skill?: Array<any>;
  users_id: string;
  first_name?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
