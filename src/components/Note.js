import React from 'react';

function Note({ note, onDelete }) {
  return (
    <div className="note">
      <p className="note-text">{note.text}</p>
      <div className="note-footer">
        <small>{new Date(note.createdAt).toLocaleString()}</small>
        <button onClick={() => {
                console.log("Deleting Note ID:", note._id); // Debugging
                onDelete(note._id);
                }}>Delete</button>
      </div>
    </div>
  );
}

export default Note; 