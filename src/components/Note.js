import React from 'react';

function Note({ note, onDelete }) {
  return (
    <div className="note">
      <p className="note-text">{note.text}</p>
      <div className="note-footer">
        <small>{note.date}</small>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}

export default Note; 