import React from 'react'
import ArchiveItem from './ArchiveItem'

function ArchivesView({ notes, setNotesReload }) {
    return (
        notes?.map((note) => <ArchiveItem note={note} key={note.noteID} setNotesReload={setNotesReload} />)
    )
}

export default ArchivesView

