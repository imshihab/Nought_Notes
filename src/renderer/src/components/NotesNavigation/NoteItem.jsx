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
        <div className="box-border w-[calc(100%-20px)] mx-3 p-3 flex rounded-xl transition-all duration-200 ease-in-out bg-[#ffffff]  hover:bg-[#78788014] cursor-pointer" id={note.noteID}>
            <div className="box-border h-full flex flex-col grow overflow-hidden">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis leading-[21px] font-['Helvetica_Neue',sans-serif] text-[17px] font-semibold">{note.title}</div>
                <div className="font-['Helvetica_Neue',sans-serif] text-[14px] font-normal text-[#000000a8] overflow-hidden whitespace-nowrap text-ellipsis flex-grow">{note.body}</div>
                <div
                    className="leading-[20px] mb-0 font-['Helvetica_Neue',sans-serif] text-[14px] font-normal"
                >
                    <span className="edited-icon">✎</span>
                    {editedDate}
                </div>
            </div>
        </div>
    )
}

export default NoteItem
