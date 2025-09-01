import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import NoteCard from "./NoteCard";
import Footer from "../components/Footer";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error Fetching Notes");
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gradient-radial" />

        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/18 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] bg-[size:50px_50px]" />
      </div>

      <Navbar />

      {isRateLimited && (
        <div className="relative z-10">
          <RateLimitedUI />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30 border-t-primary shadow-glow"></div>
              <div
                className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-primary/70 animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
            <p className="text-primary mt-6 font-semibold text-lg animate-pulse">
              Loading Notes...
            </p>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-base-content mb-4 bg-gradient-to-r from-primary via-base-content to-primary bg-clip-text text-transparent drop-shadow-lg">
                Your Notes
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full mx-auto mb-4"></div>
              <p className="text-base-content/80 text-xl font-medium">
                {notes.length} {notes.length === 1 ? "note" : "notes"} found
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {notes.map((note, index) => (
                <div
                  key={note._id}
                  className="animate-slide-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <NoteCard note={note} setNotes={setNotes} />
                </div>
              ))}
            </div>
          </div>
        )}

        {notes.length === 0 && !loading && !isRateLimited && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center max-w-lg">
              <div className="text-8xl mb-6 opacity-60 animate-pulse">📝</div>
              <h2 className="text-3xl font-bold text-base-content mb-4 drop-shadow-sm">
                No notes yet
              </h2>
              <p className="text-base-content/70 mb-8 text-lg leading-relaxed">
                Start creating your first note to see it here. Your ideas
                deserve a beautiful home.
              </p>
              <div className="w-40 h-2 bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
