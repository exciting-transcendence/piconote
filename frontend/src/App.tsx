import React, { useEffect } from 'react'
import './App.css'
import Main from './Main'
import Sidebar, { NotePreview } from './Sidebar'
import { useState } from 'react'
import { Note } from './Note'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem('notes') || '[]'),
  )
  const [activeNote, setActiveNote] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled Note',
      body: '',
      lastModified: Date.now(),
    }
    console.log('Adding note')
    setNotes([...notes, newNote])
    setActiveNote(newNote.id)
    console.log(notes)
  }

  const onDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const getActiveNote = () => {
    return notes.find(note => note.id === activeNote)
  }

  const onUpdateNote = (updatedNote: Note) => {
    const newNotes = notes.map(note => {
      if (note.id === activeNote) {
        return updatedNote
      }
      return note
    })

    setNotes(newNotes)
  }

  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={sortedNotes.map(note => (
          <NotePreview
            note={note}
            key={note.id}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        ))}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
