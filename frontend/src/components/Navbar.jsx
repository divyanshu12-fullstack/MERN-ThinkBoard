import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10 shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter transition-transform hover:scale-105">
            <Link to="/" className="hover:text-primary-focus">
              Thinkboard
            </Link>
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="btn btn-primary btn-md sm:btn-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
              aria-label="Create new note"
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
