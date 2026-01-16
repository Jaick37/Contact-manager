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
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <button type="submit" className="auth-button">
  Sign Up
</button>
<p style={{ marginTop: "12px" }}>
  Already have an account?{" "}
  <a href="/login" style={{ color: "#2563eb" }}>
    Login
  </a>
</p>


    </form>
  );
}
