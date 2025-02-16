import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Header from './components/Header';
import Metrics from './components/Metrics';
import './App.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const API_ENDPOINT = 'https://5c0g4yhsjl.execute-api.ap-south-1.amazonaws.com/dev/notes';

    const fetchNotes = () => {
        fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Fetched notes:', data);
            setNotes(Array.isArray(data) ? data : []);
            setError(null);
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
            setError('Failed to fetch notes');
        });
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const addNote = (noteText) => {
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ text: noteText })
        })
        .then(response => response.json())
        .then(newNote => {
            setNotes(prevNotes => [newNote, ...prevNotes]);
            setError(null);
        })
        .catch(error => {
            console.error('Error adding note:', error);
            setError('Failed to add note');
        });
    };

    const deleteNote = (id) => {
        console.log('Deleting note with ID:', id);
        fetch(`${API_ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
            setError(null);
        })
        .catch(error => {
            console.error('Error deleting note:', error);
            setError('Failed to delete note');
        });
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
