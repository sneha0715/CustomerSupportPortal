// NoteForm.jsx
import React, { useState } from "react";
import { validateNoteContent } from "../../utils/validations";
import { BetweenHorizontalStart } from "lucide-react";

const NoteForm = ({ onSubmit, loading, onCancel }) => {
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateNoteContent(note);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    await onSubmit(note);
    setNote("");
  };

  return (
    <div className="  ">
      <div className="flex items-center justify-between mb-2"></div>

      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            className="w-full font-mono text-sm font-bold text-muted-foreground px-3 py-2 border border-border rounded-lg bg-background focus:ring-0 focus:ring-primary outline-hidden min-h-[50px] resize-y transition-colors"
            placeholder="Add Note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              if (error) setError("");
            }}
            disabled={loading}
          />
        </div>

        {error && (
          <p className="text-destructive text-xs font-medium">{error}</p>
        )}

        <div className="flex gap-3 mt-3">
          <button
            type="submit"
            disabled={loading || !note.trim()}
            className="flex-1 flex items-center justify-center gap-2 text-xs sm:flex-none px-3 md:px-4 py-2 bg-emerald-600 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-bold font-futura rounded-lg transition-colors duration-200 disabled:cursor-not-allowed cursor-pointer"
          >
            <BetweenHorizontalStart strokeWidth={3} className="w-5 h-5" />
            {loading ? "Adding..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
