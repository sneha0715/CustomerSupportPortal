import {
  HeroSection,
  StatsBar,
  CreateTicketCard,
  ViewTicketsCard,
  AnimateBackgroundElements,
  SearchTicketBar,
} from "./components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="text-background">
      <AnimateBackgroundElements />

      <main className="relative z-10 px-3 md:px-8 py-10">
        <HeroSection />
        <StatsBar />

        <SearchTicketBar />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <CreateTicketCard
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              onClick={() => navigate("/create-ticket")}
            />
            <ViewTicketsCard
              hoveredCard={hoveredCard}
              setHoveredCard={setHoveredCard}
              onClick={() => navigate("/view-tickets")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;