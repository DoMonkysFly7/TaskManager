"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

// custom components
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

import ErrorMessage from "../../components/ErrorMessage"; 
import SuccessMessage from "../../components/SuccessMessage"; 

export default function TasksPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");
  const [priority, setPriority] = useState("medium");
  const [searchQuery, setSearchQuery] = useState("");

  // Daca nu e logat, redirect la /login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);


  // Seteaza daca task-ul este 'facut' sau nu 
  const toggleDone = async (task) => {
    await updateDoc(doc(db, "tasks", task.id), {
      done: !task.done,
    });
  };


  // Citim task-urile din Firestore pentru userul curent
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(list);
    });

    return unsubscribe;
  }, [user]);

      // filtram task-uri-le atat dupa titlu cat si dupa descriere
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Logica formular
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "tasks", editId), 
        { 
          title, 
          desc,
          priority
        });
        setEditId(null);

        setSuccess("Task edited successfully!");
        setTimeout(() => setSuccess(""), 3000); 
      } else {
        await addDoc(collection(db, "tasks"), {
          title,
          desc,
          priority,
          done: false, 
          uid: user.uid,
        });

        setSuccess("Task added successfully!");
        setTimeout(() => setSuccess(""), 3000); 

        setPriority("medium");
      }

      setTitle("");
      setDesc("");
      setError("");
    } catch (err) {
        console.error("Firebase error:", err);
        setError("Error saving task: " + err.message);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDesc(task.desc);
    setEditId(task.id);

  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));

    setSuccess("Task deleted successfully!");
    setTimeout(() => setSuccess(""), 3000); 
  };


  // Returnam UI

return (
  <main
    style={{
      minHeight: "100vh",
      padding: "2rem 1rem",
      backgroundColor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
    }}
  >
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
        <div>
            <h1 style={{ fontSize: "2rem", margin: 0, color: "black" }}>📝 My Tasks    </h1> 
      </div>


      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        {user?.email && (
          <p style={{ fontSize: "0.9rem", color: "#666", margin: 0 }}>
            {user.email}
          </p>
        )}
        <button
          onClick={logout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>


    </header>

    <ErrorMessage message={error} />
    <SuccessMessage message={success} />

   <TaskForm
      title={title}
      setTitle={setTitle}
      desc={desc}
      setDesc={setDesc}
      priority={priority}
      setPriority={setPriority}
      onSubmit={handleSubmit}
      editId={editId}
    />


      <section
        style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
>

  <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

  {filteredTasks.length === 0 ? (
    <p style={{ textAlign: "center", color: "#888" }}>
      No tasks added/match your search.
    </p>
  ) : (
      <ul style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem",
        listStyle: "none",
        padding: 0,
        margin: 0,
      }}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleDone={toggleDone}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </ul>

  )}
</section>

  </main>
);

}
