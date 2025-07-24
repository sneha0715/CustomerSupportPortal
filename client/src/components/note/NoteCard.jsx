const NoteCard = ({ note }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className=" rounded-lg p-3 hover:border-border transition-colors">
      <div className="space-y-2">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap font-semibold font-Poppins text-sm px-1 ">
          • {note.content}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1 ">
            <span>🕒</span>
            {formatDate(note.createdAt)}
          </span>

          {/* {note.createdAt !== note.updatedAt && (
            <span className="text-muted-foreground/70">• edited</span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
