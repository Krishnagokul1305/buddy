export interface UserBasic {
  id: number;
  username: string;
  email: string;
  name?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: { String: string; Valid: boolean };
  email: string;
  phone: { String: string; Valid: boolean };
  college_name: { String: string; Valid: boolean };
  year_of_study: { Int32: number; Valid: boolean };
  degree: { String: string; Valid: boolean };
  branch: { String: string; Valid: boolean };
  github_username: { String: string; Valid: boolean };
  leetcode_username: { String: string; Valid: boolean };
  linkedin_username: { String: string; Valid: boolean };
  resume_link: { String: string; Valid: boolean };
  profile_picture: { String: string; Valid: boolean };
  bio: { String: string; Valid: boolean };
  is_verified: boolean;
}

export interface EditUserForm {
  phone: string;
  bio: string;
  github_username: string;
  leetcode_username: string;
}

export interface UserData {
  username: string;
  email: string;
  password: string;
  name?: string | null;
  phone?: string | null;
  college_name?: string | null;
  year_of_study?: number | null;
  degree?: string | null;
  branch?: string | null;
  github_username?: string | null;
  leetcode_username?: string | null;
  linkedin_username?: string | null;
  resume_link?: string | null;
  profile_picture?: string | null;
  bio?: string | null;
}
