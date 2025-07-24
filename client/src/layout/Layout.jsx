import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useTheme } from "../context/Theme";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div
      className=" flex flex-col items-center justify-start"
      style={{
        backgroundImage: theme === "light" ? "url('/bg.png')" : "none",
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <Header />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
