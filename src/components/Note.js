import React from 'react';

const Note = ({ note, onDelete }) => {
    const handleDelete = async (id) => {
        console.log('Deleting note with ID:', id);
        try {
            const response = await fetch(`https://5c0g4yhsjl.execute-api.ap-south-1.amazonaws.com/dev/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'DELETE'
                },
                credentials: 'omit'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Delete successful:', data);
            onDelete(id);
        } catch (error) {
            console.error('Error deleting note:', error);
            alert('Failed to delete note. Please try again.');
        }
    };

    return (
        <div className="note">
            <p>{note.text}</p>
            <div className="note-footer">
                <span className="timestamp">{new Date(note.createdAt).toLocaleString()}</span>
                <button 
                    className="delete-button"
                    onClick={() => handleDelete(note.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Note;