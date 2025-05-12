export interface UserBasic {
  id: number
  username: string
  email: string
  name?: string
}

export interface UserProfile {
  id: number
  username: string
  name: { String: string; Valid: boolean }
  email: string
  phone: { String: string; Valid: boolean }
  college_name: { String: string; Valid: boolean }
  year_of_study: { Int32: number; Valid: boolean }
  degree: { String: string; Valid: boolean }
  branch: { String: string; Valid: boolean }
  github_username: { String: string; Valid: boolean }
  leetcode_username: { String: string; Valid: boolean }
  linkedin_username: { String: string; Valid: boolean }
  resume_link: { String: string; Valid: boolean }
  profile_picture: { String: string; Valid: boolean }
  bio: { String: string; Valid: boolean }
  is_verified: boolean
}

export interface EditUserForm {
  phone: string
  bio: string
  github_username: string
  leetcode_username: string
}

export interface RegisterUserData {
  username: string
  email: string
  password_hash: string
  name: string
  phone: string
  bio: string
  college_name: string
  year_of_study: string
  degree: string
  branch: string
  github_username: string
  leetcode_username: string
  linkedin_username: string
  resume_link: string
  profile_picture: string
  is_verified: boolean
}
