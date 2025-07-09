import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "./NoteCard";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
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
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-gradient-radial" />

        {/* Additional subtle patterns */}
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
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
              <div
                className="absolute inset-0 rounded-full h-12 w-12 border-4 border-transparent border-t-primary/50 animate-spin"
                style={{
                  animationDuration: "1.5s",
                  animationDirection: "reverse",
                }}
              ></div>
            </div>
            <p className="text-primary mt-4 font-medium animate-pulse">
              Loading Notes...
            </p>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="space-y-6">
            {/* Header section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-base-content mb-2 bg-gradient-to-r from-primary via-base-content to-primary bg-clip-text text-transparent">
                Your Notes
              </h1>
              <p className="text-base-content/70 text-lg">
                {notes.length} {notes.length === 1 ? "note" : "notes"} found
              </p>
            </div>

            {/* Notes grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {notes.map((note, index) => (
                <div
                  key={note._id}
                  className="animate-slide-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                  }}
                >
                  <NoteCard note={note} />
                </div>
              ))}
            </div>
          </div>
        )}

        {notes.length === 0 && !loading && !isRateLimited && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-4 opacity-50">📝</div>
              <h2 className="text-2xl font-bold text-base-content mb-2">
                No notes yet
              </h2>
              <p className="text-base-content/60 mb-6">
                Start creating your first note to see it here
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
