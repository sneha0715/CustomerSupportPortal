import { Ticket } from "lucide-react";

const CreateTicketCard = ({ hoveredCard, setHoveredCard, onClick }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHoveredCard("create")}
      onMouseLeave={() => setHoveredCard(null)}
      className="group relative w-full text-left"
    >
      <div
        className={`relative bg-white/20 border cursor-pointer border-white/50 backdrop-blur-sm rounded-3xl p-4 transition-all duration-500 hover:scale-105 hover:rotate-1 ${
          hoveredCard === "create"
            ? "shadow-2xl shadow-rose-500/25"
            : "shadow-lg"
        }`}
      >
        <div className="absolute inset-0  bg-gradient-to-br from-rose-600/10 to-rose-200/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-rose-200 rounded-2xl mb-2 group-hover:rotate-12 transition-transform duration-500">
            <Ticket className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-rose-400 transition-colors">
            Create Ticket
          </h3>
          <p className="text-muted-foreground font-mono mb-4 text-xs font-semibold leading-tighter">
            Start a new support request. Our team is ready to help you solve any
            issue quickly and efficiently.
          </p>

          <div className="flex items-center font-bold text-rose-400 group-hover:text-rose-300 transition-colors">
            <span className="mr-2">Get Started</span>
            <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center group-hover:bg-rose-100/40 transition-all">
              <span className="text-sm font-bold">→</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CreateTicketCard;
