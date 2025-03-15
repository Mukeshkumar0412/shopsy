// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });
//       localStorage.setItem("token", res.data.token);
//       navigate("/"); // Redirect to homepage
//     } catch (err) {
//       setError("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold">Email</label>
//             <input
//               type="email"
//               className="w-full p-2 border rounded mt-1"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold">Password</label>
//             <input
//               type="password"
//               className="w-full p-2 border rounded mt-1"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error);
//         return;
//       }

//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } catch (err) {
//       setError("Server error! Try again later.");
//     }
//   };

//   return (
//     <div className="container mx-auto mt-10">
//       <h1 className="text-2xl font-bold text-center">Login</h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <form onSubmit={handleLogin} className="max-w-md mx-auto">
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border p-2 my-2"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 my-2"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white py-2">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect user after login
      navigate("/");
    } catch (err) {
      setError("Server error! Try again later.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
