// app/tasks/TaskForm.js
import React from "react";

export default function TaskForm({
  title,
  desc,
  priority,
  setTitle,
  setDesc,
  setPriority,
  onSubmit,
  editId,
}) {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <input
        id="titleInput"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        style={{
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        maxLength={300}
        style={{
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          resize: "vertical",
          minHeight: "80px",
        }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
      <button
        type="submit"
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "0.75rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {editId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}


