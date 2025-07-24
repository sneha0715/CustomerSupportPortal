import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchTicketBar = () => {
  const [ticketId, setTicketId] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ticketId.trim()) {
      navigate(`/ticket/${ticketId.trim()}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center gap-2 max-w-xl mx-auto my-10 bg-white/10 border border-white/30 rounded px-1 md:px-4 py-3 backdrop-blur-md shadow-md">
      <Search className="text-muted-foreground w-6 h-6" stroke="pink" />
      <input
        type="text"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter Ticket ID"
        className="flex-1 bg-transparent outline-none text-sm text-foreground font-bold placeholder:text-muted-foreground"
      />
      <button
        onClick={handleSearch}
        className="text-xs cursor-pointer font-bold px-3 py-2 rounded bg-rose-400 hover:bg-rose-500 text-white transition"
      >
        View
      </button>
    </div>
  );
};

export default SearchTicketBar;
