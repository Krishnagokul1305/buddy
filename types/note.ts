import { UserProfile } from "./user";

export interface NotesFormValues {
  title: string;
  content: string;
  isPublic: boolean;
}

export interface EditNote {
  id: number;
  title: string;
  content: string;
  isPublic: boolean;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  shareSlug: string;
  isPublic: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  sharedWithUsers?: SharedUserAccess[];
}

export interface SharedUserAccess {
  user: UserProfile;
  access: AccessLevel;
  sharedAt: Date;
}

export enum AccessLevel {
  VIEW = "VIEW",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export type Access = "VIEW" | "EDIT" | "DELETE";

export interface NoteWithAccess extends Note {
  access: Access;
}
