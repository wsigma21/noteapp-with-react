import "./Main.css"

function Main({ activeNote, onUpdateNote }) {
  const onEditNote = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      modeDate: Date.now(),
    });
  }

  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されていません</div>
  }
  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input 
          id="title"
          type="text" 
          value={activeNote.title} 
          onChange={(event) => onEditNote("title", event.target.value)}
        />
        <textarea 
          id="content" 
          placeholder="ノート内容を記入" 
          value={activeNote.content} 
          onChange={(event) => onEditNote("content", event.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">{activeNote.content}</div>
      </div>
    </div>
  )
}

export default Main