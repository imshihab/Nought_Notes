import React from "react"
function NoteItem({ note }) {
    const editedDate = new Date(note.edited).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    const createdDate = new Date(note.created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return (
        <div className="note__item box-border w-[calc(100%-20px)] mx-3 p-3 flex rounded-xl transition-all duration-200 ease-in-out" id={note.noteID}>
            <div className="item__content">
                <div className="item__title">{note.title}</div>
                <div className="item__body">{note.body}</div>
                <div
                    className="item__date"
                >
                    <span className="edited-icon">✎</span>
                    {editedDate}
                </div>
            </div>
        </div>
    )
}

export default NoteItem
