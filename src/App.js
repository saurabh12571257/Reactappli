import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Header from './components/Header';
import Metrics from './components/Metrics';
import './App.css';

// Add API_URL constant
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [notes, setNotes] = useState([]);
  const [metricsHistory, setMetricsHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/notes`);
      const data = await response.json();
      setNotes(data);
      setMetricsHistory(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (noteText) => {
    try {
      const response = await fetch(`${API_URL}/api/notes`, {
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
      alert('Failed to add note. Please try again.');
    }
  };

  const deleteNote = async (id) => {
    setNotes(notes.filter(note => note._id !== id));
  };

  const deleteFromHistory = async (id) => {
    try {
      await fetch(`${API_URL}/api/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter(note => note._id !== id));
      setMetricsHistory(metricsHistory.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note. Please try again.');
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
              {error && <div className="error-message">{error}</div>}
              {loading ? (
                <div className="loading">Loading notes...</div>
              ) : (
                <>
                  <NoteForm onSubmit={addNote} />
                  <NoteList notes={notes} onDelete={deleteNote} />
                </>
              )}
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