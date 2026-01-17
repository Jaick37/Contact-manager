import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/contacts");
  };

 return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
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
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: "12px", textAlign: "center" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#2563eb" }}>
          Login
        </a>
      </p>
    </div>
  </div>
);

}
