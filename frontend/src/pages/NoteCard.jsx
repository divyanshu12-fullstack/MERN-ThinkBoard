import { PenSquare, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative card bg-base-100/80 backdrop-blur-sm hover:bg-base-100/90 
                 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 
                 border border-base-300/50 hover:border-primary/50
                 before:absolute before:inset-0 before:rounded-2xl 
                 before:bg-gradient-to-br before:from-primary/10 before:to-transparent 
                 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                 transform hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Glowing border effect */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 
                      rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="card-body relative z-10">
        <h3
          className="card-title text-base-content group-hover:text-primary transition-colors duration-300 
                       font-semibold text-lg"
        >
          {note.title}
        </h3>

        <p
          className="text-base-content/70 line-clamp-3 text-sm leading-relaxed group-hover:text-base-content/80 
                      transition-colors duration-300"
        >
          {note.content}
        </p>

        <div className="card-actions justify-between items-center mt-4 pt-3 border-t border-base-300/30">
          <span className="text-xs text-base-content/60 font-medium bg-base-200/50 px-2 py-1 rounded-full">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            <div
              className="p-1.5 rounded-full bg-primary/10 text-primary opacity-70 group-hover:opacity-100 
                            transition-all duration-300 group-hover:bg-primary/20"
            >
              <PenSquare className="size-3.5" />
            </div>

            <button
              className="btn btn-ghost btn-xs text-error hover:bg-error/10 
                               opacity-70 group-hover:opacity-100 transition-all duration-300
                               hover:scale-110 active:scale-95"
            >
              <Trash2Icon className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
