export interface NoteCardProps {
  id: number;
  title: string;
  content: string;
  onSelect: (id: number) => void;
}
export type Note = {
  id: number;
  title: string;
  content: string;
};

export type NoteItem = {
  id: number;
  title: string;
  content: string | null;
};

export type NotesContextValue = {
  notes: Note[];
  addNote: (note: Note) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, data: Partial<Note>) => void;
};

export type NoteUpdate = {
  title?: string;
  content?: string;
};

export type NoteFormFieldsProps = {
  isCreate: boolean;
  initialNote?: Note;
};
