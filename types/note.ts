export interface Note {
  id: number;
  title: string;
  content: string;
  is_public: boolean;
  userId: number;
  share_slug: string;
  created_at: Date;
  updated_at: Date;
}

export interface NotesFormValues {
  title: string;
  content: string;
  is_public: boolean;
}
