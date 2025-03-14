import React, { memo, useState, useCallback } from 'react'
import NoteItem from "./NoteItem"

const NotesView = memo(({ pinnedNotes, otherNotes, setNotesReload, length }) => {
    const [activeNoteId, setActiveNoteId] = useState(null);

    const handleClick = useCallback((noteId) => {
        if (activeNoteId === noteId) return;
        setActiveNoteId(noteId);
    }, [activeNoteId]);

    return (
        <>
            {pinnedNotes?.length > 0 && (
                <div className="text-left flex items-center gap-1 w-full !min-h-[40px] px-[24px] tracking-wide !-my-2">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg>
                    <span className="font-['Helvetica_Neue',sans-serif] text-[16px] font-bold">
                        Pinned:
                    </span>
                </div>
            )}

            {pinnedNotes?.map((note) => (
                <NoteItem
                    note={note}
                    key={note.noteID}
                    setNotesReload={setNotesReload}
                    handleClick={handleClick}
                    isActive={note.noteID === activeNoteId}
                />
            ))}

            {pinnedNotes?.length > 0 && (
                <div className="text-left flex items-center gap-1.5 w-full !min-h-[40px] px-[24px] tracking-wide !-my-2">
                    <span className="font-['Helvetica_Neue',sans-serif] text-[16px] font-bold">
                        Notes
                    </span>
                </div>
            )}
            {otherNotes?.map((note) => (
                <NoteItem
                    note={note}
                    key={note.noteID}
                    setNotesReload={setNotesReload}
                    handleClick={handleClick}
                    isActive={note.noteID === activeNoteId}
                />
            ))}
        </>
    )
});

export default memo(NotesView);
