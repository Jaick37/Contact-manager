import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) alert(error.message);
    else navigate("/contacts");
  };

 return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      <p style={{ marginTop: "12px", textAlign: "center" }}>
        Don’t have an account?{" "}
        <a href="/signup" style={{ color: "#2563eb" }}>
          Sign up
        </a>
      </p>
    </div>
  </div>
);

}
