import React, { useEffect, useState } from "react"
import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"
import { useLocation } from "react-router"
import { del, get, onChange } from "esmls"

const FetchNotes = async (isActive, setNotes) => {
    if (isActive === null) return;
    const results = await window.folders.notes(isActive.name, isActive.uid);
    const data = results?.data;
    setNotes(data);
}

function NotesNavigation({ reload, setReload }) {
    const [notes, setNotes] = useState([]);


    useEffect(() => {
        const isActive = get("isActive");
        FetchNotes(isActive, setNotes);

        onChange("isActive", async (newVal) => {
            if (newVal === null) return;
            FetchNotes(newVal, setNotes);

            if (name === "Archives" && uid === "0000000") {
                // ToDo: Fetch Archives
                return;
            }
            if (name === "Favorites" && uid === "0000000") {
                // ToDo: Fetch Favorites
                return;
            }

            if (name === "Trash" && uid === "0000000") {
                // ToDo: Fetch Trash
                return;
            }

            if (name === "Hidden" && uid === "0000000") {
                // ToDo: Fetch Hidden
                return;
            }
        })
    }, [])

    return (
        <div className="bg-transparent w-[320px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-72px)] mt-2 rounded-t-2xl relative overflow-hidden">
            <FolderContainer reload={reload} setReload={setReload} />
            <NotesContainer notes={notes} />
        </div>
    )
}

export default NotesNavigation
