import React from 'react'

export default function ContentView({ note }) {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="whitespace-pre-line">{note.content}</p>
        </div>
    )
}
