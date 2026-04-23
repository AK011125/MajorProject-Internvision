"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load notes from browser storage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title || !content) return;

    const newNote = {
      id: Date.now(),
      title,
      content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Quick Notes App
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <input
            type="text"
            placeholder="Enter Title"
            className="w-full border p-3 rounded mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter Content"
            className="w-full border p-3 rounded mb-4"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={addNote}
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Add Note
          </button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-600 mt-2">{note.content}</p>

              <button
                onClick={() => deleteNote(note.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}