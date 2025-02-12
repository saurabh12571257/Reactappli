require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 5001;

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a schema
const noteSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

// API Routes

// Fetch all notes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add a new note
app.post('/notes', async (req, res) => {
  const newNote = new Note({ text: req.body.text });
  await newNote.save();
  res.json(newNote);
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
  
    // Check if ID is valid
    if (!id || id.length !== 24) {
      return res.status(400).json({ error: "Invalid note ID" });
    }
  
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
  
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

