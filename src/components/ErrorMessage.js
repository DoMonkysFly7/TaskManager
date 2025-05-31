"use client";

export default function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: "#ffe6e6",
        color: "#cc0000",
        border: "1px solid #f5b5b5",
        padding: "0.75rem 1rem",
        borderRadius: "6px",
        margin: "0 auto 1rem",
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
