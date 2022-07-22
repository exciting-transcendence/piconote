import React from 'react'
import { Note } from './Note'

const Main = ({
  activeNote,
  onUpdateNote,
}: {
  activeNote: Note | undefined
  onUpdateNote: (updatedNote: Note) => void
}) => {
  const onEditField = (key: string, value: string) => {
    const newNote: Note = {
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    } as Note
    onUpdateNote(newNote)
  }

  if (!activeNote) {
    return <div className="no-active-note">No active note</div>
  } else {
    return (
      <div className="app-main">
        <div className="app-main-note-edit">
          <input
            type="text"
            id="title"
            placeholder="Note Title"
            value={activeNote.title}
            onChange={e => onEditField('title', e.target.value)}
            autoFocus
          />
          <textarea
            id="body"
            placeholder="Write your note here..."
            value={activeNote.body}
            onChange={e => onEditField('body', e.target.value)}
          />
        </div>
        <div className="app-main-note-preview">
          <h1 className="preview-title">{activeNote.title}</h1>
          <div className="markdown-preview">{activeNote.body}</div>
        </div>
      </div>
    )
  }
}

export default Main
