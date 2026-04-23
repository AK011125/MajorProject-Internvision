const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let notes = [
    {    
    id: 1,
    title: "First Note",
    content: "Welcome to Quick Notes App"
}
];

app.get("/api/notes",(req,res) =>{
    res.json(notes);
});

app.post("/api/notes",(req, res) =>{
    const {title, content} = req.body;

    const newNote = {
        id: Date.now(),
        title,
        content
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
    const id = Number (req.params.id);

    notes = notes.filter(note => note.id !== id);

    res.json({ message: "Note deleted"});
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});