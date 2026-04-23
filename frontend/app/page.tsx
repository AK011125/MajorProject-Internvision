"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (!title || !content) return;

    if (editId) {
      const updated = notes.map((note) =>
        note.id === editId ? { ...note, title, content } : note
      );
      setNotes(updated);
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note: any) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100 p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-8 text-gray-800">
          Quick Notes Pro
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full border p-3 rounded-lg mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Title"
            className="w-full border p-3 rounded-lg mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter Content"
            className="w-full border p-3 rounded-lg mb-4"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={saveNote}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editId ? "Update Note" : "Add Note"}
          </button>
        </div>

        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {note.title}
              </h2>

              <p className="text-gray-600 mt-2">{note.content}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => editNote(note)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteNote(note.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}