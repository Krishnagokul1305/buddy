export interface Note {
  id: number;
  title: string;
  content: string;
  is_public: boolean;
  user_id: number;
  share_slug: string;
  created_at: string;
  updated_at: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  is_public: boolean;
}
