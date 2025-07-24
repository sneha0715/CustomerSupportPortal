import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/Theme";
import { useAuthServices } from "../services/api/useAuthServices";
import { validateLoginFormData } from "../utils/validations";
import { Link, useLocation } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
};
const Login = () => {
  const location = useLocation();
  const { theme } = useTheme();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState("");

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { loginUser, loading, error } = useAuthServices();

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validateLoginFormData(formData);
    if (validationError) return setErrors(validationError);
    setErrors("");

    await loginUser(formData);
    setFormData(initialFormData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full h-[90vh] mt-12 pb-8 md:pb-0 backdrop-blur-md  rounded-t-4xl  overflow-hidden flex flex-col items-center justify-end md:justify-center md:flex-row  ${
        theme === "dark" ? "bg-background" : ""
      }`}
    >
      <div className="w-full md:w-1/2  backdrop-blur-sm px-5  md:px-18 ">
        <h2 className="text-3xl font-bold px-3 ">LOGIN</h2>
        <form onSubmit={submitHandler} className="mt-4 space-y-3">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="email"
            name="email"
            placeholder=" e.g: john@support.com "
            value={formData.email}
            onChange={handleChanges}
            className="input-field"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="password"
            name="password"
            placeholder="* * * * * * * *"
            value={formData.password}
            onChange={handleChanges}
            className="input-field"
          />

          {errors && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm font-medium"
            >
              ⚠ {errors}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            type="submit"
            className="auth-button"
          >
            {loading ? "Loading..." : "  Login →"}
          </motion.button>
        </form>

        <p className="text-sm text-foreground text-center mt-4">
          Don’t have an account ?
          <Link
            to="/signUp"
            state={{ from: location.state?.from }}
            className="text-teal-800 hover:text-muted-foreground font-semibold ml-1 transition-all duration-200 ease-in-out"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>

      {/* Image Side Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-40 relative">
        {theme === "dark" ? (
          <img
            src="/image3.svg"
            alt="illustration"
            className="w-full object-cover rounded-2xl "
          />
        ) : (
          <img
            src="/image3.svg"
            alt="illustration"
            className="w-full object-cover rounded-2xl "
          />
        )}
      </div>
    </motion.div>
  );
};

export default Login;