// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", {
//         name,
//         email,
//         password,
//       });
//       navigate("/login"); // Redirect to login page after successful signup
//     } catch (err) {
//       setError("Signup failed. Try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <form onSubmit={handleSignup}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold">Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded mt-1"
//               placeholder="Enter name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
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
//           <button className="w-full bg-green-500 text-white py-2 rounded">Sign Up</button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Server error! Try again later.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSignup} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="w-full bg-green-500 text-white py-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
