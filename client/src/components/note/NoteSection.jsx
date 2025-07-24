import React from "react";
import NoteCard from "./NoteCard";
import { ScrollText } from "lucide-react";
import SmoothScroll from "../SmoothScroll";

const NoteSection = ({ notes, loading }) => {
  return (
    <div className="bg-card rounded-xl py-2 px-2 shadow-lg border border-border h-fit">
      <div className="flex items-center gap-2 text-muted-foreground mb-4 px-2 pt-4">
        <ScrollText strokeWidth={3} />
        <h2 className="text-xl font-bold ">Notes</h2>
        <span className="bg-emerald-400/30 text-primary px-2 py-1 rounded-full text-xs font-medium">
          {notes.length}
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg p-4">
                <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : notes.length === 0 ? (
        <div className="px-2">
          <p className="text-foreground text-lg font-mono font-bold ">
            No notes yet
          </p>
        </div>
      ) : (
        <SmoothScroll className="space-y-3 max-h-98">
          {notes
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
        </SmoothScroll>
      )}
    </div>
  );
};

export default NoteSection;
