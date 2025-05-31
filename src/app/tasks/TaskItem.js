"use client";
import React from "react";

export default function TaskItem({ task, onToggleDone, onEdit, onDelete }) {
  return (
    <li
      style={{
        backgroundColor: task.done ? "#f0f0f0" : "#fff",
        borderRadius: "8px",
        padding: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        margin: "10px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: task.done ? "#888" : "#333",
            textDecoration: task.done ? "line-through" : "none",
            transition: "color 0.3s ease, textDecoration 0.3s ease",
          }}
        >
          {task.title}
        </h3>
        <input
          type="checkbox"
          checked={task.done ?? false}
          onChange={() => onToggleDone(task)}
          style={{
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        />
      </div>

      <p style={{ margin: 0, color: "#555" }}>{task.desc}</p>

      <p
        style={{
          fontWeight: "bold",
          marginTop: "0.5rem",
          color:
            task.priority === "high"
              ? "#dc3545"
              : task.priority === "medium"
              ? "#ffc107"
              : "#28a745",
        }}
      >
        Priority:{" "}
        {task.priority
          ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
          : "Low"}
      </p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <a
          href="#titleInput"
          onClick={() => onEdit(task)}
          style={{
            backgroundColor: "#ffc107",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit
        </a>
        <button
          onClick={() => onDelete(task.id)}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
