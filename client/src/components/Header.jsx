import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/Theme";
import { MdDarkMode, MdLightMode } from "react-icons/md";


const Header = () => {
   const navigate = useNavigate();
   const { theme, toggleTheme } = useTheme();

   return (
      <header className="fixed top-0 w-full z-50 bg-foreground h-14 md:h-16 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
         {/* Logo */}
         <div
            className="text-xl md:text-2xl font-semibold text-background cursor-pointer"
            onClick={() => navigate("/", { replace: true })}
         >
            SupportDesk
         </div>

         {/* Navigation Links */}
         <nav className="flex items-center gap-4 text-sm md:text-base">
            {["login", "signup"].map((tab) => (
               <Link
                  key={tab}
                  to={`/${tab}`}
                  className="capitalize text-background hover:text-primary transition-colors duration-200"
               >
                  {tab}
               </Link>
            ))}
         </nav>

         {/* Theme Toggle */}
         <button
            onClick={toggleTheme}
            className="text-sm p-8 text-background hover:text-primary transition-colors duration-200"
         >
            {theme === "dark" ? (
               <MdLightMode className="text-lg text-black" />
            ) : (
               <MdDarkMode className="text-lg text-white" />
            )}
         </button>
      </header>
   );
};

export default Header;
