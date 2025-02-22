import React from 'react'

export default function NoteList({ notes, activeNoteId, onNoteClick }) {
    return (
        <div className="w-72 border-r border-gray-300 p-4">
            {notes.map((note) => (
                <div
                    key={note.id}
                    onClick={() => onNoteClick(note.id)}
                    className={`cursor-pointer py-2 ${
                        note.id === activeNoteId
                            ? 'font-bold border-l-4 border-blue-500 pl-2'
                            : 'hover:text-blue-600'
                    }`}
                >
                    {note.title}
                </div>
            ))}
        </div>
    )
}
