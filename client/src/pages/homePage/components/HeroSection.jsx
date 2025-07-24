import { useTheme } from "@/context/Theme";

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <div className="text-center mb-12">
      <h1 className="text-6xl font-black text-foreground mb-4 tracking-tight">
        Support
        <span className="bg-gradient-to-r from-neutral-800 to-rose-500 bg-clip-text text-transparent">
          {" "}Desk
        </span>
      </h1>
      <p className="text-sm text-muted-foreground font-bold font-mono max-w-2xl mx-auto leading-relaxed">
        Your gateway to instant support. Create tickets, track progress,
        and get the help you need with our streamlined support system.
      </p>
    </div>
  );
};

export default HeroSection;
