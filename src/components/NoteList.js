import React from 'react';
import Note from './Note';

function NoteList({ notes, onDelete }) {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <p>No notes yet. Add one!</p>
      ) : (
        notes.map(note => (
          <Note
            key={note._id}
            note={note}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default NoteList; 