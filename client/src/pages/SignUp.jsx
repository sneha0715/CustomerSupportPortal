import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/Theme";
import { validateRegisterFormData } from "../utils/validations";
import { useAuthServices } from "../services/api/useAuthServices";
import { useLocation, Link } from "react-router-dom";

const INITIAL_FORM_DATA = {
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpPage = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState("");

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { registerUser, loading } = useAuthServices(formData, location);

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = validateRegisterFormData(formData);
    if (validationError) return setErrors(validationError);

    setErrors("");
    await registerUser(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full h-[90vh] mt-12 pb-8 md:pb-0 backdrop-blur-md  rounded-t-4xl  overflow-hidden flex flex-col items-center justify-center md:justify-center md:flex-row  ${
        theme === "dark" ? "bg-background" : ""
      }`}
    >
      <div className="w-full md:w-1/2  backdrop-blur-sm px-5 md:px-16 ">
        <h2 className="text-3xl font-bold px-3 ">SIGN UP</h2>
        <form onSubmit={submitHandler} className="mt-4 space-y-2.5">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="text"
            name="fullname"
            placeholder="what's your name ?"
            value={formData.fullname}
            onChange={handleChanges}
            className="input-field"
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="email"
            name="email"
            placeholder="e.g : john@me.com"
            value={formData.email}
            onChange={handleChanges}
            className="input-field"
            required
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
            required
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
            value={formData.confirmPassword}
            onChange={handleChanges}
            className="input-field"
            required
          />

          {errors && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm font-medium"
            >
              ⚠ {errors}.
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            type="submit"
            className="auth-button"
          >
            Sign Up →
          </motion.button>
        </form>
        <p className="text-sm text-foreground text-center mt-4">
          Already have an account ?
          <Link
            to="/login"
            className="text-teal-800 hover:text-muted-foreground font-semibold ml-1 transition-all duration-200 ease-in-out"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center p-30 relative">
        {theme === "dark" ? (
          <img
            src="/image7.svg"
            alt="Login Illustration"
            className="w-full object-contain rounded-2xl "
          />
        ) : (
          <img
            src="/image7.svg"
            alt="Login Illustration"
            className="w-full object-contain rounded-2xl "
          />
        )}
      </div>
    </motion.div>
  );
};

export default SignUpPage;