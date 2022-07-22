import React, { useEffect } from 'react'
import './App.css'
import Main from './Main'
import Sidebar, { NotePreview } from './Sidebar'
import { useState } from 'react'
import { Note } from './Note'

const App = () => {
  const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>(
      JSON.parse(localStorage.getItem('notes') || '[]'),
    )
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    const onAddNote = () => {
      const newNote = new Note()
      setNotes([...notes, newNote])
      setActiveNoteId(newNote.id)
    }

    const onDeleteNote = (id: string) => {
      setNotes(notes.filter(note => note.id !== id))
    }

    const getActiveNote = () => {
      return notes.find(note => note.id === activeNoteId)
    }

    const onUpdateNote = (updatedNote: Note) => {
      const newNotes = notes.map(note => {
        if (note.id === activeNoteId) {
          return updatedNote
        }
        return note
      })

      setNotes(newNotes)
    }

    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)

    return {
      sortedNotes,
      onAddNote,
      onDeleteNote,
      onUpdateNote,
      getActiveNote,
      activeNoteId,
      setActiveNoteId,
    }
  }

  const {
    sortedNotes,
    onAddNote,
    activeNoteId,
    setActiveNoteId,
    onDeleteNote,
    onUpdateNote,
    getActiveNote,
  } = useNotes()

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={sortedNotes.map(note => (
          <NotePreview
            note={note}
            key={note.id}
            activeNote={activeNoteId}
            onDeleteNote={onDeleteNote}
            setActiveNote={setActiveNoteId}
          />
        ))}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  )
}

export default App
