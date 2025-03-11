import React from "react"
import { useLocation, useNavigate } from "react-router"
import NoteItem from "./NoteItem"
import { del, get } from "esmls"
import quickSort from "../Helper/quickSort"


function NotesContainer({ notes, setNotesReload }) {
    const location = useLocation()
    const navigate = useNavigate()

    const Items = ["Folder/", "Archives", "Favorites", "Trash", "Hidden"]
    const isRoot = Items.some(item => location.pathname.startsWith(`/${item}`));
    const pinnedNotes = notes.filter(note => note.Pinned);
    const otherNotes = notes.filter(note => !note.Pinned);

    return (
        <div className={`w-[320px] ${!isRoot ? 'translate-x-[320px]' : 'translate-x-[0px]'} h-[calc(100vh-72px)] transform-gpu absolute inset-0 transition-transform duration-150 ease-in-out`}>
            <div className="w-full h-[52px] box-border px-3 grid grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center sticky top-0 z-[4]">
                <div className="flex items-center h-[52px] justify-start">
                    <button
                        onClick={() => {
                            navigate("/")
                            del("isActive")
                        }}
                        className="all-unset flex justify-center items-center h-[40px] w-[40px] cursor-pointer rounded hover:bg-black/[0.073] active:bg-black/[0.086] active:translate-y-[1px] transition-[background-color,transform] duration-200 ease-in-out"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="folder__title leading-[52px] truncate overflow-x-hidden whitespace-nowrap h-[52px] px-3 cursor-default font-['Helvetica_Neue',sans-serif] text-base font-semibold">
                    {get("isActive")?.name}
                </div>
                <div className="flex items-center h-[52px] justify-end">
                    <span className="folder__title-count text-xs text-black/60 font-medium px-2 bg-[#f5f5f5] rounded-xl inline-block align-middle h-6 leading-6">
                        {notes?.length}
                    </span>
                </div>
            </div>
            <div className="relative isolate w-full h-[calc(100vh-72px-52px)] overflow-y-auto overflow-x-hidden py-2 flex flex-col items-center gap-2">
                {pinnedNotes.length > 0 && (
                    <h2 className="text-left flex w-full px-[16px] text-sm font-medium text-black/60 uppercase tracking-wide">
                        Pinned:
                    </h2>
                )}
                {pinnedNotes.map((note) => <NoteItem note={note} key={note.noteID} setNotesReload={setNotesReload} />)}
                {pinnedNotes.length > 0 && <hr className="border-t-4 w-[calc(100%-24px)] border-[#dadce0]" />}
                {otherNotes.map((note) => <NoteItem note={note} key={note.noteID} setNotesReload={setNotesReload} />)}
            </div>
        </div>
    )
}

export default NotesContainer
