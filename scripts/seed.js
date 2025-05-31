// scripts/seed.js - pentru a adauga task-uri la un singur utilizator (specificat dupa uid)

"use client";
import { useEffect } from "react";
import { faker } from "@faker-js/faker";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const userUid = "Uv3LYPf01DQxaw4tx9vcULwEezI3"; 

export default function SeedPage() {
  useEffect(() => {
    async function seed() {
      for (let i = 0; i < 30; i++) {
        await addDoc(collection(db, "tasks"), {
          title: faker.lorem.words(3),
          desc: faker.lorem.sentence(),
          uid: userUid,
        });
      }
      alert("✅ Task-uri adăugate cu succes!");
    }

    seed();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Seeding Firestore…</h2>
      <p>Așteaptă până ce task-urile sunt inserate. Vei primi un mesaj la final.</p>
    </main>
  );
}

