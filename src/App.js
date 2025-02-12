import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Header from './components/Header';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from MongoDB Atlas
  useEffect(() => {
    axios.get('http://localhost:5001/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  // Add note to MongoDB
  const addNote = (noteText) => {
    axios.post('http://localhost:5001/notes', { text: noteText })
      .then(response => setNotes([response.data, ...notes]))
      .catch(error => console.error('Error adding note:', error));
  };

  // Delete note from MongoDB
  const deleteNote = (id) => {
    if (!id) {
      console.error("Error: Trying to delete a note with an undefined ID.");
      return;
    }
  
    axios.delete(`http://localhost:5001/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note._id !== id)))
      .catch(error => console.error('Error deleting note:', error));
  };
  
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <main className="main-content">
              <h1 className="notes-title">Your Notes</h1>
              <NoteForm onSubmit={addNote} />
              <NoteList notes={notes} onDelete={deleteNote} />
            </main>
          } />
          <Route path="/metrics" element={
            <Metrics notes={notes} onDelete={deleteNote} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;