import React, { useState } from 'react';

function NoteForm({ onSubmit }) {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noteText.trim()) {
      onSubmit(noteText);
      setNoteText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="Write your note here..."
        rows="4"
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm; 