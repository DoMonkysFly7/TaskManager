"use client";
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: "0.75rem",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        width: "100%",
        marginBottom: "1.5rem",
      }}
    />
  );
}
