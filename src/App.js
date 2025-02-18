import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    // Fetch notes
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await fetch('https://5c0g4yhsjl.execute-api.ap-south-1.amazonaws.com/dev/notes');
            const data = await response.json();
            console.log('Fetched notes:', data);
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Add note
    const addNote = async () => {
        if (!newNote.trim()) return;

        try {
            const response = await fetch('https://5c0g4yhsjl.execute-api.ap-south-1.amazonaws.com/dev/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newNote }),
            });

            const data = await response.json();
            setNotes([...notes, data]);
            setNewNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    // Delete note
    const deleteNote = async (id) => {
        console.log('Deleting note with ID:', id);
        try {
            await fetch(`https://5c0g4yhsjl.execute-api.ap-south-1.amazonaws.com/dev/notes/${id}`, {
                method: 'DELETE',
            });

            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <header className="app-header">
                    <h1 className="app-title">My Notes</h1>
                </header>
                
                <div className="note-form">
                    <input
                        type="text"
                        className="note-input"
                        placeholder="Write a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button className="submit-button" onClick={addNote}>
                        Add Note
                    </button>
                </div>

                <div className="notes-container">
                    {notes.map(note => (
                        <Note 
                            key={note.id} 
                            note={note} 
                            onDelete={deleteNote}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
