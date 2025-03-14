import React, { useEffect, useRef, useState, memo, useCallback, useMemo } from "react"
import { createPortal } from "react-dom";
import toast from "../../Libs/toast";
import date from "../../Helper/date";

const ArchiveItem = memo(({ note, setNotesReload }) => {
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

    const handleUnarchive = useCallback(async () => {
        try {
            const result = await window.notes.unarchive(note.folderName, note.uid, note.noteID);
            if (result.status === "success") {
                setNotesReload(pre => pre + 1);
            } else {
                toast(result.message, "error");
            }
        } finally {
            closeContextMenu();
        }
    }, [note.folderName, note.uid, note.noteID, setNotesReload, closeContextMenu]);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        document.dispatchEvent(new Event("closeAllContextMenus"));

        if (menuRef.current && !dimensionsRef.current.width) {
            dimensionsRef.current = {
                width: menuRef.current.offsetWidth,
                height: menuRef.current.offsetHeight
            };
        }

        const { width = 144, height = 100 } = dimensionsRef.current;
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
                    onClick={handleUnarchive}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M5 5V7H19V5M10.5 17V14H8L12 10L16 14H13.5V17" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        Unarchive
                    </span>
                </button>
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={closeContextMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M11,17H4A2,2 0 0,1 2,15V3A2,2 0 0,1 4,1H16V3H4V15H11V13L15,16L11,19V17M19,21V7H8V13H6V7A2,2 0 0,1 8,5H19A2,2 0 0,1 21,7V21A2,2 0 0,1 19,23H8A2,2 0 0,1 6,21V19H8V21H19Z" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        Duplicate
                    </span>
                </button>
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={closeContextMenu}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        Trash
                    </span>
                </button>
            </div>,
            document.body
        );
    }, [contextMenu.show, contextMenu.x, contextMenu.y, handleUnarchive, closeContextMenu]);

    return (
        <div
            className="box-border w-[calc(100%-20px)] mx-3 px-4 py-2 flex rounded-xl transition-all duration-200 ease-in-out cursor-pointer bg-transparent hover:bg-black/[0.05] active:bg-black/[0.08]"
            id={note.noteID}
            onContextMenu={handleContextMenu}
        >
            <div className="box-border h-full flex flex-col gap-[2px] grow overflow-hidden">
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
                <div className="flex items-center gap-2 mt-2 text-[#c65463]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                    </svg>
                    <span className="text-sm">{note.folderName}</span>
                </div>
            </div>
            {contextMenuElement}
        </div>
    );
});

export default memo(ArchiveItem)
