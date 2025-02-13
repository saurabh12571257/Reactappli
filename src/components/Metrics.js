import React from 'react';
import './Metrics.css';

function Metrics({ notes, onDelete }) {
  return (
    <div className="metrics-container">
      <h2 className="metrics-title">Notes Metrics</h2>
      <div className="metrics-stats">
        <p>Total Notes Created: {notes.length}</p>
        <p>Last Updated: {notes.length > 0 ? new Date().toLocaleString() : 'No notes yet'}</p>
      </div>
      <div className="metrics-list">
        <h3>Note History</h3>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Time Created</th>
              <th>Note Content</th>
              <th className="actions-place">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (
              <tr key={note._id}>
                <td>{new Date(note.createdAt).toLocaleString()}</td>
                <td>{note.text}</td>
                <td>
                  <button 
                    onClick={() => onDelete(note._id)} // Uses deleteFromMetrics
                    className="delete-history-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Metrics;
