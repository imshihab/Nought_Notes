import React, { useState } from 'react'
import NoteList from './components/NoteList'
import ContentView from './components/ContentView'
import Sidebar from './components/SideBar'
import TopBar from './components/TopBar'

function App() {
    // Example data representing notes
    const [notes] = useState([
        {
            id: 1,
            title: 'Fundamentals of UX design',
            content: 'Today Loui Eroclanies – the UX expert – explained how crucial it is...'
        },
        {
            id: 2,
            title: 'Skeleton',
            content:
                'Interface design = product as functionality.\nNavigation design = product as information...'
        },
        {
            id: 3,
            title: 'Scope',
            content: 'Scope is about defining requirements and constraints...'
        },
        {
            id: 4,
            title: 'Strategy',
            content: 'Strategy focuses on what the product is trying to achieve, and how users...'
        }
    ])

    // Track which note is currently selected
    const [activeNoteId, setActiveNoteId] = useState(notes[0].id)

    const handleNoteClick = (id) => {
        setActiveNoteId(id)
    }

    // Get currently selected note
    const activeNote = notes.find((note) => note.id === activeNoteId)

    return (
        <>
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Section */}
            <div className="flex flex-col flex-1">
                <TopBar />
                <div className="flex flex-1">
                    <NoteList
                        notes={notes}
                        activeNoteId={activeNoteId}
                        onNoteClick={handleNoteClick}
                    />
                    {activeNote && <ContentView note={activeNote} />}
                </div>
            </div>
        </>
    )
}

export default App
