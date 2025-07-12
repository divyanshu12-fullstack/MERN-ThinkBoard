import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="relative bg-base-100/70 backdrop-blur-md border-b border-primary/20 shadow-lg top-0 z-50">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      {/* Subtle glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-primary font-mono tracking-tighter 
                         transition-all duration-300 hover:scale-105 
                         hover:text-primary-focus drop-shadow-sm"
          >
            <Link to="/" className="relative group">
              <span className="relative z-10">Thinkboard</span>
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300 
                              blur-sm -z-10 scale-110"
              />
            </Link>
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="relative group btn btn-primary btn-sm sm:btn-md 
                         transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 
                         hover:scale-105 flex items-center gap-2
                         bg-gradient-to-r from-primary to-primary-focus
                         hover:from-primary-focus hover:to-primary
                         border-0 text-primary-content font-semibold
                         before:absolute before:inset-0 before:rounded-lg 
                         before:bg-gradient-to-r before:from-white/20 before:to-transparent 
                         before:opacity-0 hover:before:opacity-100 before:transition-opacity"
              aria-label="Create new note"
            >
              <PlusIcon className="size-4 transition-transform duration-300 group-hover:rotate-90" />
              <span className="hidden sm:inline relative z-10">New Note</span>

              {/* Button glow effect */}
              <div
                className="absolute inset-0 bg-primary/30 rounded-lg opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300 
                              blur-md -z-10 scale-110"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
