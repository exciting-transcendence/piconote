import React from 'react'
import './App.css'
import Main from './Main'
import Sidebar from './Sidebar'
import { useState } from 'react'
import { Note } from './Note'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [ notes, setNotes ] = useState<Note[]>([])

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(), title: 'Untitled Note', body: '', lastModified: Date.now()
    }
    console.log('Adding note')
    setNotes([ ...notes, newNote ])
    console.log(notes)
  }

  const onDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
      />
      <Main />
    </div>
  )
}

export default App
