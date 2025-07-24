import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/Theme";
import { useAuth } from "../context/AuthContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAuthServices } from "../services/api/useAuthServices";
import { LogOutIcon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { auth } = useAuth();
  const { logoutUser } = useAuthServices();

  return (
    <header className="font-Poppins py-8 md:py-10 top-0 w-full z-50 h-14 md:h-16 px-2 pl-1 md:pl-2 pr-4 md:pr-6 lg:pl-12 lg:pr-16 flex items-center justify-between">
      {/* Logo */}
      <div
        className="text-sm ml-5 font-semibold cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        SupportDesk
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Show login/signup only if not authenticated */}
        {!auth?.token && (
          <nav className="flex items-center gap-4 text-sm md:text-base">
            {["login", "signup"].map((tab) => (
              <Link
                key={tab}
                to={`/${tab}`}
                className="capitalize font-medium text-sm hover:text-primary transition-colors duration-200"
              >
                {tab}
              </Link>
            ))}
          </nav>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="text-sm cursor-pointer hover:text-primary transition-colors duration-200"
        >
          {theme === "dark" ? (
            <MdLightMode className="text-lg" />
          ) : (
            <MdDarkMode className="text-lg" />
          )}
        </button>

        {/* User Profile */}
        {/* {auth?.token && <div className="text-xs">{auth?.user?.fullname}</div>} */}

        {auth?.token && (
          <button
            className=" px-1.5 text-xs py-1.5  flex gap-1 items-center justify-center font-semibold  w-full rounded bg-accent  text-foreground hover:bg-rose-500 hover:text-accent-foreground transition cursor-pointer"
            onClick={logoutUser}
          >
            <LogOutIcon strokeWidth={3} size={20} />
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;