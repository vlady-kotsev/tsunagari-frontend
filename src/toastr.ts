import { toast } from "react-toastify";

/**
 * Displays a success toast notification.
 * @param message - The message to display in the notification.
 */
const notifySuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

/**
 * Displays a warning toast notification.
 * @param message - The message to display in the notification.
 */
const notifyWarning = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

/**
 * Displays an error toast notification.
 * @param message - The message to display in the notification.
 */
const notifyError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export { notifySuccess, notifyWarning, notifyError };
