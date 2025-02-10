import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Header from './components/Header';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [metricsHistory, setMetricsHistory] = useState([]);

  // Fetch notes from MongoDB
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/notes');
      const data = await response.json();
      setNotes(data);
      setMetricsHistory(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async (noteText) => {
    try {
      const response = await fetch('http://localhost:5001/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: noteText }),
      });
      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setMetricsHistory([newNote, ...metricsHistory]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    // Only remove from display, not from DB
    setNotes(notes.filter(note => note._id !== id));
  };

  const deleteFromHistory = async (id) => {
    try {
      // Delete from DB when removing from metrics
      await fetch(`http://localhost:5001/api/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter(note => note._id !== id));
      setMetricsHistory(metricsHistory.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
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
              notes={metricsHistory} 
              onDelete={deleteFromHistory}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 