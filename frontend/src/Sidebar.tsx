import React from 'react'
import { Note } from './Note'

const shorten = (str: string, maxLength = 100) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...'
  }
  return str
}

const NotePreview = ({
  note,
  onDeleteNote,
  setActiveNote,
  activeNote,
}: {
  note: Note
  onDeleteNote: (id: string) => void
  activeNote: string | null
  setActiveNote: any
}) => {
  return (
    <div
      className={`app-sidebar-note ${note.id === activeNote && 'active'}`}
      onClick={() => setActiveNote(note.id)}>
      <div className="sidebar-note-title">
        <strong>{note.title}</strong>
        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
      </div>

      <p>{note.body ? shorten(note.body) : 'empty note'}</p>
      <small className="note-meta">
        Last Modified {new Date(note.lastModified).toISOString()}
      </small>
    </div>
  )
}

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}: {
  notes: Note[]
  onAddNote: () => void
  onDeleteNote: (id: string) => void
  activeNote: string | null
  setActiveNote: any
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(note => (
          <NotePreview
            note={note}
            key={note.id}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
