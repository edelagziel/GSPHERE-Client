// const CONFIG = {
//     API_BASE_URL:
//       window.location.hostname === "localhost"
//         ? "https://localhost:3000/api"
//         : "https://gsphere-server.onrender.com/api"
//   };
  


// js/config/config.js
const host = window.location.hostname; // "127.0.0.1" או "localhost" או דומיין
const isLocal = host === "127.0.0.1" || host === "localhost";

// שמור על אותו hostname גם לשרת המקומי כדי להימנע מבעיות Cookies/CORS
const CONFIG = {
  API_BASE_URL: isLocal
    ? `http://${host}:3000/api`           // לדוגמה: http://127.0.0.1:3000/api
    : "https://gsphere-server.onrender.com/api",
};

console.log("API_BASE_URL =", CONFIG.API_BASE_URL);
