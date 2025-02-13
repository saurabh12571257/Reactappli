import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Header from './components/Header';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  const [homeNotes, setHomeNotes] = useState([]);
  const [metricsNotes, setMetricsNotes] = useState([]);

  // Fetch notes from MongoDB
  useEffect(() => {
    axios.get('http://localhost:5001/notes')
      .then(response => {
        setHomeNotes(response.data);
        setMetricsNotes(response.data);
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  // Add a new note
  const addNote = (noteText) => {
    axios.post('http://localhost:5001/notes', { text: noteText })
      .then(response => {
        setHomeNotes([response.data, ...homeNotes]);
        setMetricsNotes([response.data, ...metricsNotes]);
      })
      .catch(error => console.error('Error adding note:', error));
  };

  // Delete from Home Page (ONLY removes from homeNotes, NOT from metrics)
  const deleteFromHome = (id) => {
    setHomeNotes(prevNotes => prevNotes.filter(note => note._id !== id));
  };

  // Delete from Metrics Page (Removes from BOTH homeNotes and metricsNotes + MongoDB)
  const deleteFromMetrics = (id) => {
    setHomeNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    setMetricsNotes(prevNotes => prevNotes.filter(note => note._id !== id));

    // Delete from MongoDB
    axios.delete(`http://localhost:5001/notes/${id}`)
      .catch(error => console.error('Error deleting note from DB:', error));
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
              <NoteList notes={homeNotes} onDelete={deleteFromHome} />
            </main>
          } />
          <Route path="/metrics" element={
            <Metrics notes={metricsNotes} onDelete={deleteFromMetrics} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
