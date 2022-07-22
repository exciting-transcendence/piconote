import React from 'react'
import './App.css'
import Main from './Main'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Note } from './Note'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [activeNote, setActiveNote] = useState<string | null>(null)

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

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
