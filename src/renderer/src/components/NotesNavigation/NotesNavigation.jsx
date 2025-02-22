import React from "react"
import FolderContainer from "./FolderContainer"
import NotesContainer from "./NotesContainer"

function NotesNavigation() {
    return (
        <div className="bg-transparent w-[320px] !min-w-[280px] !max-w-[320px] h-[calc(100vh-72px)] mt-2 rounded-t-2xl relative overflow-hidden">
            <FolderContainer />
            <NotesContainer />
        </div>
    )
}

export default NotesNavigation
