import { PenSquare, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Sorry note deletion failed");
      console.log("Error deleting the note: ", error);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative card bg-base-100/90 backdrop-blur-md hover:bg-base-100/95 
           hover:shadow-card-hover transition-all duration-300 
           border-2 border-base-300/60 hover:border-primary/70
           min-h-[14rem] max-h-[18rem] w-full
           before:absolute before:inset-0 before:rounded-2xl 
           before:bg-gradient-to-br before:from-primary/15 before:to-transparent 
           before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
           transform hover:scale-[1.03] hover:-translate-y-2
           shadow-card"
    >
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 via-transparent to-primary/30 
                      opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md -z-10
                      group-hover:animate-glow"
      />

      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/90 via-primary to-primary/90 
                      rounded-t-2xl opacity-90 group-hover:opacity-100 transition-all duration-300
                      group-hover:h-2"
      />

      <div className="card-body relative z-10 flex flex-col h-full p-5">
        <h3
          className="card-title text-base-content group-hover:text-primary transition-colors duration-300 
                       font-bold text-xl flex-shrink-0 line-clamp-2 mb-3 leading-tight
                       drop-shadow-sm"
        >
          {note.title}
        </h3>

        <p
          className="text-base-content/80 line-clamp-4 text-sm leading-relaxed group-hover:text-base-content/90 
                      transition-colors duration-300 flex-1 overflow-hidden my-3
                      font-medium"
        >
          {note.content}
        </p>

        <div className="card-actions justify-between items-center pt-4 border-t-2 border-base-300/40 flex-shrink-0 mt-auto">
          <span
            className="text-xs text-base-content/70 font-semibold bg-base-200/70 px-3 py-1.5 rounded-full
                         border border-base-300/40 shadow-sm"
          >
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-full bg-primary/15 text-primary opacity-80 group-hover:opacity-100 
                            transition-all duration-300 group-hover:bg-primary/25 hover:scale-110
                            border border-primary/30 shadow-sm"
            >
              <PenSquare className="size-4" />
            </div>

            <button
              className="btn btn-ghost btn-sm text-error hover:bg-error/15 
                               opacity-80 group-hover:opacity-100 transition-all duration-300
                               hover:scale-110 active:scale-95 border border-error/30 hover:border-error/50
                               shadow-sm hover:shadow-md"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
