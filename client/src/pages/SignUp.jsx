import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { useTheme } from "../context/Theme";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState("");
  const { theme } = useTheme()
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return setErrors("Passwords do not match");
    }
    if (password.length < 8) {
      return setErrors("Password must be at least 8 characters");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return setErrors("Password must contain a special character");
    }
    if (!/[A-Z]/.test(password)) {
      return setErrors("Password must contain an uppercase letter");
    }

    setErrors("");
    console.log(formData);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (

    <>

      <div className="min-h-screen bg-foreground flex items-center justify-center font-Poppins">
        <Header />
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-4xl bg-card border-2 border-card-foreground mt-10 backdrop-blur-md shadow-2xl rounded-4xl overflow-hidden flex flex-col md:flex-row"
        >



          {/* Right Form Section */}
          <div className="w-full md:w-1/2 bg-card  backdrop-blur-sm px-10 py-6 ">
            <h2 className="text-3xl font-bold text-foreground text-center pb-2">SIGN UP</h2>

            <form onSubmit={submitHandler} className="space-y-3">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-card border-2 border-card-foreground text-foreground placeholder-muted-foreground rounded-full focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-card border-2 border-card-foreground text-foreground placeholder-muted-foreground rounded-full focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-card border-2 border-card-foreground text-foreground placeholder-muted-foreground rounded-full focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />

              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChanges}
                className="w-full px-4 py-3 bg-card border-2 border-card-foreground text-foreground placeholder-muted-foreground rounded-full focus:border-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />

              {errors && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-center text-sm font-medium"
                >
                  ⚠️ {errors}.
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                type="submit"
                className="w-full py-3 bg-foreground  text-background font-semibold rounded-full shadow-lg outline-hidden mt-3"
              >
                Sign Up →
              </motion.button>

            </form>

            <p className="text-sm text-foreground text-center mt-4">
              Already have an account ?
              <a href="#" className="text-emerald-600 hover:text-pink-300">
                {" "}Login
              </a>
            </p>
          </div>

          <div className="hidden md:flex w-1/2 items-center justify-center bg-card p-24 relative">
            {theme === "dark" ? <img
              src="/image3.svg"
              alt="Login Illustration"
              className="w-full object-contain rounded-2xl shadow-lg"
            /> :
              <img
                src="/image2.svg"
                alt="Login Illustration"
                className="w-full object-contain rounded-2xl shadow-lg"
              />}
          </div>

        </motion.div>
      </div>
    </>
  );
};



export default SignUpPage;
