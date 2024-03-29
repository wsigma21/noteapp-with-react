import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import { v4 as uuid } from "uuid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNoteId, setActiveNoteId] = useState(false);

  // notesが更新されるたびにローカルストレージも更新
  useEffect(()=> {
    localStorage.setItem("notes", JSON.stringify(notes));
  },[notes]);

  // ページを開くとノートの1番目が選択された状態にする
  useEffect(()=> {
    if (notes.length !== 0) setActiveNoteId(notes[0].id);
  },[]);
  
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteId)
  }

  const onUpdateNote = (updatedNote) => {
    // 更新された新しいnotesの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if(note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    })
    setNotes(updatedNotesArray)
  }

  return (
    <div className="App">
      <Sidebar 
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  )
}

export default App
