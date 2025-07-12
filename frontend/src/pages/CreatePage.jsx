import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note Created successfully");
      navigate("/");
    } catch (error) {
      if (error.response.status === 429) {
        toast.error("Slow down! You are creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        console.log("Error creating note", error);
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gradient-radial" />

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 text-base-content/70 hover:text-primary 
                       transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeftIcon className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Notes</span>
          </Link>

          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-sm opacity-50" />

            <div className="relative card bg-base-100/80 backdrop-blur-md border border-primary/20 shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-t-2xl" />

              <div className="card-body">
                <h2 className="card-title text-3xl mb-6 bg-gradient-to-r from-primary via-base-content to-primary bg-clip-text text-transparent">
                  Create New Note
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium text-base-content/80">
                        Title
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your note title..."
                      className="input input-bordered bg-base-100/50 backdrop-blur-sm 
                                 focus:border-primary/50 focus:bg-base-100/80 transition-all duration-300
                                 hover:border-primary/30 text-base-content placeholder:text-base-content/50"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium text-base-content/80">
                        Content
                      </span>
                    </label>
                    <textarea
                      placeholder="Write your thoughts here..."
                      className="textarea textarea-bordered h-40 bg-base-100/50 backdrop-blur-sm 
                                 focus:border-primary/50 focus:bg-base-100/80 transition-all duration-300
                                 hover:border-primary/30 text-base-content placeholder:text-base-content/50 resize-none"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>

                  <div className="card-actions justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative group btn btn-primary btn-lg min-w-[140px]
                                 bg-gradient-to-r from-primary to-primary-focus
                                 hover:from-primary-focus hover:to-primary
                                 border-0 text-primary-content font-semibold
                                 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 
                                 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                                 before:absolute before:inset-0 before:rounded-lg 
                                 before:bg-gradient-to-r before:from-white/20 before:to-transparent 
                                 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-content/30 border-t-primary-content"></div>
                          <span>Creating...</span>
                        </div>
                      ) : (
                        "Create Note"
                      )}

                      <div
                        className="absolute inset-0 bg-primary/30 rounded-lg opacity-0 
                                      group-hover:opacity-100 transition-opacity duration-300 
                                      blur-md -z-10 scale-110"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
