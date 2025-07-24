export const validateRegisterFormData = (formData) => {
  const { password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
};

export const validateTicketFormData = (formData) => {
  const { title, product, description } = formData;

  if (!title?.trim()) {
    return "Title is required";
  }

  if (title.length < 3) {
    return "Title must be at least 3 characters long";
  }

  if (!product?.trim()) {
    return "Please select a product";
  }

  if (!description?.trim()) {
    return "Description is required";
  }

  if (description.length < 10) {
    return "Description must be at least 10 characters long";
  }

  return null;
};

export const validateLoginFormData = (formData) => {
  if (!formData.email?.trim()) {
    return "Email is required";
  }
  if (!formData.email.includes("@")) {
    return "Email must be valid";
  }
  if (!formData.password?.trim()) {
    return "Password is required";
  }
  if (formData.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

export const validateNoteContent = (content) => {
  if (content.length < 4) {
    return "Note must be at least 4 characters";
  }
  if (content.length > 50) {
    return "Note must be less than 50 characters";
  }
  return null;
};