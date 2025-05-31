"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      router.push("/tasks");
    }
  }, [user, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, pass);
        
      } else {
        await createUserWithEmailAndPassword(auth, email, pass);
      }
      // router.push("/tasks"); // nu e nevoie, se face automat în useEffect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
     <main
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#f0f0f0",
  }}
>
  <div
    style={{
      width: "100%",
      maxWidth: "400px",
      background: "#ffffff",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "1.5rem",
        fontSize: "1.5rem",
        color: "#222",
      }}
    >
      {isLogin ? "Login" : "Register"}
    </h2>

    <form onSubmit={handleSubmit}>
      <label style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}>
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "1rem",
          color: "#222",
          backgroundColor: "#fff",
        }}
        required
      />

      <label style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}>
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "1rem",
          color: "#222",
          backgroundColor: "#fff",
        }}
        required
      />

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        style={{
          width: "100%",
          padding: "0.75rem",
          marginTop: "1rem",
          backgroundColor: "#eeeeee",
          fontWeight: "bold",
          fontSize: "1rem",
          color: "#333",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Need an account? Register" : "Have an account? Login"}
      </button>
    </form>
  </div>
</main>

  );
}
