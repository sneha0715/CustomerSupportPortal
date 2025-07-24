import { useNavigate } from "react-router-dom";
const BackButton = ({ redirectTo }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(redirectTo || -1)}
      className="mb-6 px-3 ml-1 py-2 font-semibold border rounded-md bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
    >
      ← Back
    </button>
  );
};

export default BackButton;
