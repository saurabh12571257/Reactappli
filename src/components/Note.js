import React from 'react';
import './Note.css';

const Note = ({ note, onDelete }) => {
    const handleDelete = async (id) => {
        console.log('Deleting note with ID:', id);
        try {
            const response = await fetch(`https://5c0g4yhsjl.execute-api.ap-south-1.amazonaws.com/dev/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            onDelete(id);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="note">
            <div className="note-content">
                <p>{note.text}</p>
                <div className="note-footer">
                    <span className="timestamp">
                        {new Date(note.createdAt).toLocaleString()}
                    </span>
                    <button 
                        className="delete-button"
                        onClick={() => handleDelete(note.id)}
                        aria-label="Delete note"
                    >
                        <span className="delete-icon">×</span>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Note;