import { toast } from "react-toastify";

const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

const notifyWarning = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export { notifySuccess, notifyWarning, notifyError };
