import { Toaster, toast } from "sonner";
import "../styles/toast.css"; 
export const ToastContainer = () => {
  return (
    <Toaster
      position="bottom-right"
      duration={3000}
      theme="dark"
      className="sonner-container"
    />
  );
};

export const successToast = (message) => {
  return toast.success(message, {
    className: "h-10",
  });
};

export const errorToast = (message) => {
  return toast.error(message, {
    className: "",
  });
};
export const infoToast = (message) => {
  return toast.info(message, {
    className: "",
  });
};

export const warningToast = (message) => {
  return toast.warning(message, {
    className: "",
  });
};
