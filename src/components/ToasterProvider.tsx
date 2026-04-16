import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#273144",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterProvider;
