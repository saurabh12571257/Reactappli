import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Header from './components/Header';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (noteText) => {
    const newNote = {
      id: Date.now(),
      text: noteText,
      createdAt: new Date()
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
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
            <Metrics 
              notes={notes} 
              onDelete={deleteNote}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 