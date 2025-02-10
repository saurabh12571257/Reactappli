const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const noteSchema = new mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now },
  isArchived: { type: Boolean, default: false }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note; 