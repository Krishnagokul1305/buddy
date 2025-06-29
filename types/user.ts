export interface UserBasic {
  id: number;
  username: string;
  email: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditUserForm {
  username: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserData {
  id?: number;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}
