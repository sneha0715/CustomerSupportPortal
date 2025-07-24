import { Eye } from "lucide-react";

const ViewTicketsCard = ({ hoveredCard, setHoveredCard, onClick }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHoveredCard("view")}
      onMouseLeave={() => setHoveredCard(null)}
      className="group relative w-full text-left"
    >
      <div
        className={`relative bg-white/20 cursor-pointer border border-white/50 backdrop-blur-sm rounded-3xl p-4 transition-all duration-500 hover:scale-105 hover:-rotate-1 ${
          hoveredCard === "view" ? "shadow-2xl shadow-blue-500/25" : "shadow-lg"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-200/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-200 rounded-2xl mb-2 group-hover:-rotate-12 transition-transform duration-500">
            <Eye className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-blue-400 transition-colors">
            View Tickets
          </h3>
          <p className="text-muted-foreground font-mono mb-4 text-xs font-semibold leading-relaxed">
            Track your support requests, check status updates, and review resolved issues all in one place.
          </p>

          <div className="flex items-center font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
            <span className="mr-2">View All</span>
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-100/40 transition-all">
              <span className="text-sm font-bold">→</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ViewTicketsCard;
