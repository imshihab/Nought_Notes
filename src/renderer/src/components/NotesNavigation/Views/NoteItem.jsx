import React, { useEffect, useRef, useState, memo, useCallback, useMemo } from "react"
import { createPortal } from "react-dom";
import toast from "../../Libs/toast";
import date from "../../Helper/date";

const NoteItem = memo(({ note, setNotesReload, handleClick, isActive }) => {
    // Memoize dates since they only change when note changes
    const dates = useMemo(() => ({
        edited: date(note.edited),
        created: date(note.created)
    }), [note.edited, note.created]);

    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
    const menuRef = useRef(null);
    const dimensionsRef = useRef({ width: 0, height: 0 });

    const closeContextMenu = useCallback(() => {
        setContextMenu({ show: false, x: 0, y: 0 });
    }, []);

    const handlePinNote = useCallback(async () => {
        try {
            const result = await window.notes.pinNote(note.folder, note.uid, note.noteID);
            if (result.status === "success") {
                setNotesReload(pre => pre + 1);
            } else {
                toast(result.message, "error");
            }
        } finally {
            closeContextMenu();
        }
    }, [note.folder, note.uid, note.noteID, setNotesReload, closeContextMenu]);

    const handleArchive = useCallback(async () => {
        try {
            const result = await window.notes.archive(note.folder, note.uid, note.noteID);
            if (result.status === "success") {
                setNotesReload(pre => pre + 1);
            } else {
                toast(result.message, "error");
            }
        } finally {
            closeContextMenu();
        }
    }, [note.folder, note.uid, note.noteID, setNotesReload, closeContextMenu]);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        document.dispatchEvent(new Event("closeAllContextMenus"));

        if (menuRef.current && !dimensionsRef.current.width) {
            dimensionsRef.current = {
                width: menuRef.current.offsetWidth,
                height: menuRef.current.offsetHeight
            };
        }

        const { width = 144, height = 100 } = dimensionsRef.current; // Default minimum sizes
        const x = Math.min(event.pageX, window.innerWidth - width);
        const y = Math.min(event.pageY, window.innerHeight - height);

        setContextMenu({ show: true, x, y });
    }, []);

    useEffect(() => {
        if (!contextMenu.show) return;

        const handleClickOutside = (e) => {
            if (menuRef.current?.contains(e.target)) return;
            closeContextMenu();
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("closeAllContextMenus", closeContextMenu);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("closeAllContextMenus", closeContextMenu);
        };
    }, [contextMenu.show, closeContextMenu]);

    // Memoize the context menu to prevent unnecessary portal creation
    const contextMenuElement = useMemo(() => {
        if (!contextMenu.show) return null;

        return createPortal(
            <div
                ref={menuRef}
                className="fixed bg-white flex flex-col rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] min-w-[144px] py-2 z-50"
                style={{ top: contextMenu.y, left: contextMenu.x }}
            >
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={handlePinNote}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d={note.Pinned ? "M8,6.2V4H7V2H17V4H16V12L18,14V16H17.8L14,12.2V4H10V8.2L8,6.2M20,20.7L18.7,22L12.8,16.1V22H11.2V16H6V14L8,12V11.3L2,5.3L3.3,4L20,20.7M8.8,14H10.6L9.7,13.1L8.8,14Z" : "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z"} />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        {note.Pinned ? "Unpin" : "Pin"}
                    </span>
                </button>
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={handleArchive}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M5 5V7H19V5M10.5 11V14H8L12 18L16 14H13.5V11" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        Archive
                    </span>
                </button>
            </div>,
            document.body
        );
    }, [contextMenu.show, contextMenu.x, contextMenu.y, note.Pinned, handlePinNote, handleArchive]);

    const handleItemClick = useCallback(() => {
        handleClick(note.noteID);
    }, [handleClick, note.noteID]);

    return (
        <div
            className={`box-border w-[calc(100%-20px)] mx-3 px-3 py-2 flex rounded-xl transition-all duration-200 ease-in-out cursor-pointer
                ${isActive
                    ? "bg-[#d0e6ff]"
                    : "bg-transparent hover:bg-black/[0.05] active:bg-black/[0.08]"
                }`}
            id={note.noteID}
            onContextMenu={handleContextMenu}
            onClick={handleItemClick}
        >
            <div className="box-border h-full flex flex-col grow gap-[2px] overflow-hidden">
                <div className="overflow-hidden whitespace-nowrap text-ellipsis leading-[21px] font-['Helvetica_Neue',sans-serif] text-[17px] font-semibold">
                    {note.title}
                </div>
                <div className="font-['Helvetica_Neue',sans-serif] text-[14px] font-normal text-[#000000a8] overflow-hidden whitespace-nowrap text-ellipsis flex-grow">
                    {note.body}
                </div>
                <div
                    className="leading-[20px] mb-0 font-['Helvetica_Neue',sans-serif] text-[14px] font-normal"
                    title={`edited: ${dates.edited}\ncreated: ${dates.created}`}
                >
                    <span className="!mr-2">✎</span>
                    {dates.edited}
                </div>
            </div>
            {contextMenuElement}
        </div>
    );
});

export default memo(NoteItem)
