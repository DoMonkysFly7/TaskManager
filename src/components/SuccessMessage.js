"use client";

export default function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#e6ffed",
        color: "#177245",
        padding: "0.75rem 1rem",
        borderRadius: "6px",
        margin: "0 auto 1rem",
        border: "1px solid #b0f0c2",
        fontWeight: 500,
        fontSize: "0.95rem",
        maxWidth: "500px",
        width: "90%",
        textAlign: "center",
      }}
    >
      ✅ {message}
    </div>
  );
}
