// components/Toast.js
const Toast = ({ message, type = "success" }) => (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {message}
    </div>
  );
  
  export default Toast;
  