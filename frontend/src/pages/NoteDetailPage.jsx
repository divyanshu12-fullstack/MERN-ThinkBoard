import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeftIcon, LoaderCircle, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

function NoteDetailPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNode = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to fetching the note");
        console.log("Issue fetching the note ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNode();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title,
        content,
      });
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Note Updation failed");
      console.log("Error updating the data", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      navigate("/");
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Sorry note deletion failed");
      console.log("Error deleting the note: ", error);
    }
  };

  if (loading) {
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
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary"></div>
              <div
                className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-primary/50 animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
            <p className="text-primary mt-4 font-medium animate-pulse">
              Loading Note...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary 
                         transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeftIcon className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-medium">Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline hover:bg-error hover:text-error-content
                         transition-all duration-300 hover:scale-105 group"
            >
              <Trash2Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Delete Note</span>
            </button>
          </div>

          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-sm opacity-50" />

            <div className="relative card bg-base-100/80 backdrop-blur-md border border-primary/20 shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 rounded-t-2xl" />

              <div className="card-body">
                <h2 className="card-title text-3xl mb-6 bg-gradient-to-r from-primary via-base-content to-primary bg-clip-text text-transparent">
                  Edit Note
                </h2>

                <form className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base font-medium text-base-content/80">
                        Title
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter note title..."
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
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
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
                      {saving ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-content/30 border-t-primary-content"></div>
                          <span>Saving...</span>
                        </div>
                      ) : (
                        "Save Changes"
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
}

export default NoteDetailPage;
