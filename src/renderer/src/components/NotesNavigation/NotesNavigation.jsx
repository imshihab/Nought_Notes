import React from "react"
import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"

function NotesNavigation({ reload, setReload }) {
    return (
        <div className="bg-transparent w-[320px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-72px)] mt-2 rounded-t-2xl relative overflow-hidden">
            <FolderContainer reload={reload} setReload={setReload} />
            <NotesContainer />
        </div>
    )
}

export default NotesNavigation
