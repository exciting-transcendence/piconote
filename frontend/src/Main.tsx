import React from 'react'

const Main = () => {

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          // placeholder="Note Title"
          // value={activeNote.title}
          // onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Write your note here..."
        // value={activeNote.body}
        // onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">TITLE</h1>
        <div className='markdown-preview'>note preview</div>
      </div>
    </div>
  )
}

export default Main
