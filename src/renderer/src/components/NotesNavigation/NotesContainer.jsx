import React from "react"
import { useLocation } from "react-router"

function NotesContainer() {
    const location = useLocation()
    const Items = ["Folder/", "Archives", "Favorites", "Trash", "Hidden"]
    const isRoot = Items.some(item => location.pathname.startsWith(`/${item}`));
    return (
        <div className={`w-[320px] ${!isRoot ? 'translate-x-[320px]' : 'translate-x-[0px]'} h-[calc(100vh-72px)] transform-gpu absolute inset-0 overflow-y-auto overflow-x-hidden transition-transform duration-150 ease-in-out`}>
            NotesContainer
        </div>
    )
}

export default NotesContainer
