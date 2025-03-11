import React, { useEffect, useRef, useState, memo, useCallback } from "react"
import { createPortal } from "react-dom";
import toast from "../../Libs/toast";
import date from "../../Helper/date";

const ArchiveItem = memo(({ note, setNotesReload }) => {
    const editedDate = date(note.edited);
    const createdDate = date(note.created);

    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
    const menuRef = useRef(null);
    const dimensionsRef = useRef({ width: 0, height: 0 });


    const handleUnarchive = useCallback(async () => {
        const result = await window.notes.unarchive(note.folderName, note.uid, note.noteID);
        if (result.status === "success") {
            setNotesReload((pre) => pre + 1);
        } else if (result.status === "fail") {
            toast(result.message, "error");
        }
        setContextMenu({ show: false, x: 0, y: 0 });
    }, [note.folderName, note.uid, note.noteID, setNotesReload]);

    const handleContextMenu = useCallback((event) => {
        event.preventDefault();
        document.dispatchEvent(new Event("closeAllContextMenus"));

        if (!dimensionsRef.current.width && menuRef.current) {
            dimensionsRef.current = {
                width: menuRef.current.offsetWidth,
                height: menuRef.current.offsetHeight
            };
        }

        const { width, height } = dimensionsRef.current;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        let x = Math.min(event.pageX, windowWidth - width);
        let y = Math.min(event.pageY, windowHeight - height);

        setContextMenu({ show: true, x, y });
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current?.contains(e.target)) return;
            setContextMenu({ show: false, x: 0, y: 0 });
        };

        const handleCloseAll = () => {
            setContextMenu({ show: false, x: 0, y: 0 });
        };

        if (contextMenu.show) {
            document.addEventListener("click", handleClick);
            document.addEventListener("closeAllContextMenus", handleCloseAll);
        }

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("closeAllContextMenus", handleCloseAll);
        };
    }, [contextMenu.show]);

    const contextMenuElement = contextMenu.show
        ? createPortal(
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
                    onClick={() => { }}
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
                    onClick={() => { }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        Trash
                    </span>
                </button>
            </div >,
            document.body
        )
        : null

    return (
        <>
            <div className="box-border w-[calc(100%-20px)] mx-3 px-4 py-2 flex rounded-xl transition-all duration-200 ease-in-out bg-[#ffffff]  hover:bg-[#78788014] cursor-pointer" id={note.noteID} onContextMenu={handleContextMenu}>
                <div className="box-border h-full flex flex-col gap-[2px] grow overflow-hidden">
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis leading-[21px] font-['Helvetica_Neue',sans-serif] text-[17px] font-semibold">{note.title}</div>
                    <div className="font-['Helvetica_Neue',sans-serif] text-[14px] font-normal text-[#000000a8] overflow-hidden whitespace-nowrap text-ellipsis flex-grow">{note.body}</div>
                    <div
                        className="leading-[20px] mb-0 font-['Helvetica_Neue',sans-serif] text-[14px] font-normal"
                        title={`edited: ${editedDate}\ncreated: ${createdDate}`}
                    >
                        <span className="!mr-2">✎</span>
                        {editedDate}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[#c65463]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                        </svg>
                        <span className="text-sm">{note.folderName}</span>
                    </div>
                </div>
            </div>

            {contextMenuElement}
        </>
    )
})

export default memo(ArchiveItem)
