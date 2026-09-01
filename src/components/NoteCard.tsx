"use client";
import { NoteCardProps } from "../types/notes";

export default function NoteCard({
  id,
  title,
  content,
  onSelect,
}: NoteCardProps) {
  return (
    <article
      className="bg-white/80 hover:bg-white border-2 border-lime-50/20 rounded-lg 
      p-2 shadow-sm cursor-pointer hover:shadow-md transition h-38 flex 
      flex-col w-38"
      onClick={() => onSelect(id)}
    >
      <h2 className="line-clamp-1 font-semibold text-lg ">{title}</h2>
      <p className="line-clamp-3 flex-1 text-sm">{content}</p>
    </article>
  );
}
