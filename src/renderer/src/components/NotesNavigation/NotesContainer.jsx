import React from "react"
import { useLocation, useNavigate } from "react-router"
import Index from "./Views/Index"
import NotesView from "./Views/NotesView"
import ArchivesView from "./Views/ArchivesView"


function NotesContainer({ notes, setNotesReload, type }) {
    const location = useLocation()

    const Items = ["Folder/", "Archives", "Favorites", "Trash", "Locked"]
    const isRoot = Items.some(item => location.pathname.startsWith(`/${item}`));

    if (type === "Notes") {
        const pinnedNotes = notes?.filter(note => note.Pinned);
        const otherNotes = notes?.filter(note => !note.Pinned);
        return <Index isRoot={isRoot} length={notes?.length}>
            <NotesView pinnedNotes={pinnedNotes} otherNotes={otherNotes} setNotesReload={setNotesReload} length={notes?.length} />
        </Index>
    }

    if (type === "Archives") {
        return <Index isRoot={isRoot} length={notes?.length}>
            <ArchivesView notes={notes} setNotesReload={setNotesReload} />
        </Index>
    }
}

export default NotesContainer
