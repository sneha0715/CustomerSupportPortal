import { useTheme } from "@/context/Theme";

const stats = [
  { label: "Available", value: "24/7" },
  { label: "Satisfaction", value: "98%" },
  { label: "Response Time", value: "< 2h" },
];

const StatsBar = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap flex-1/2 justify-center gap-8 mb-12 text-foreground font-bold">
      {stats.map(({ label, value }, i) => (
        <div
          key={i}
          className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/50"
        >
          <div className="text-2xl">{value}</div>
          <div
            className={`${
              theme === "dark" ? "text-rose-300" : "text-rose-400"
            } text-xs font-bold font-Futura`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
