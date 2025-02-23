import React, { useEffect, useState } from "react"
import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"
import { useLocation } from "react-router"
import { del, get } from "esmls"

function NotesNavigation({ reload, setReload, activeFolder, setActiveFolder }) {
    const location = useLocation()
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        (async () => {
            const results = await window.folders.notes(activeFolder.name, activeFolder.uid);
            const data = results?.data;
            setNotes(data);
        })();
    }, [activeFolder, location.pathname]);
    return (
        <div className="bg-transparent w-[320px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-72px)] mt-2 rounded-t-2xl relative overflow-hidden">
            <FolderContainer reload={reload} setReload={setReload} setActiveFolder={setActiveFolder} />
            <NotesContainer notes={notes} activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
        </div>
    )
}

export default NotesNavigation
