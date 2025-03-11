import React, { useEffect, useState, memo } from "react"
import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"
import { get, onChange } from "esmls"
import toast from "../Libs/toast"

const FetchNotes = async (isActive, setNotes) => {
    if (isActive === null) return;
    const results = await window.folders.notes(isActive.name, isActive.uid);

    if (results.status === "fail") {
        toast(results.message);
        return;
    }

    setNotes(results);
}

function NotesNavigation({ reload, setReload }) {
    const [notes, setNotes] = useState({});
    const [notesReload, setNotesReload] = useState(0);

    useEffect(() => {
        const isActive = get("isActive");
        FetchNotes(isActive, setNotes);

    }, [notesReload])
    useEffect(() => {
        onChange("isActive", async (newVal) => {
            if (newVal === null) return;
            FetchNotes(newVal, setNotes);
        })
    }, [])

    return (
        <div className="bg-transparent w-[320px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-72px)] mt-2 rounded-t-2xl relative overflow-hidden">
            <FolderContainer reload={reload} setReload={setReload} />
            <NotesContainer type={notes.type} notes={notes.data} setNotesReload={setNotesReload} />
        </div>
    )
}

export default memo(NotesNavigation)
