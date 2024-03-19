import { toast } from "react-toastify";

const Index = (message = "Your request are Sucessfull !") => {
  toast.success(`${message}`, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export default Index;