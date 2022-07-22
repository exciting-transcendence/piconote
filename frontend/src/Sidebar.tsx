import React from 'react'
import { Note } from './Note'

const shorten = (str: string, maxLength = 100) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...'
  }
  return str
}

const NotePreview = ({ note, onDeleteNote }:
  { note: Note, onDeleteNote: (id: string) => void }) => {
  return (
    <div className='app-sidebar-note'>
      <div className='sidebar-note-title'>
        <strong>{note.title}</strong>
        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
      </div>

      <p>{note.body ? shorten(note.body) : 'empty note'}</p>
      <small className='note-meta'>
        Last Modified {new Date(note.lastModified).toISOString()}
      </small>
    </div>
  )
}

const Sidebar = (
  { notes, onAddNote, onDeleteNote }:
    { notes: Note[], onAddNote: () => void, onDeleteNote: (id: string) => void }) => {
  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className='app-sidebar-notes'>
        {notes.map(note => (
          <NotePreview
            note={note}
            key={note.id}
            onDeleteNote={onDeleteNote}
          />)
        )}
      </div>
    </div>
  )
}

export default Sidebar
