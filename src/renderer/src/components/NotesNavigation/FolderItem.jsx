import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { createPortal } from "react-dom"
import toast from "../Libs/toast"
import { set } from "esmls"
import FolderModel from "./FolderModel"

function FolderItem({ folder, setReload }) {
    const { name, id, Pinned, icon } = folder;
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 })
    const menuRef = useRef(null)
    const [menuDimensions, setMenuDimensions] = useState({ width: 150, height: 100 })
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Update menu dimensions when it renders
    useEffect(() => {
        if (contextMenu.show && menuRef.current) {
            const { offsetWidth, offsetHeight } = menuRef.current
            setMenuDimensions({ width: offsetWidth, height: offsetHeight })
        }
    }, [contextMenu.show])

    useEffect(() => {
        const handleCloseAll = () => {
            if (contextMenu.show) {
                setContextMenu({ show: false, x: 0, y: 0 })
            }
        }
        document.addEventListener("closeAllContextMenus", handleCloseAll)
        return () => {
            document.removeEventListener("closeAllContextMenus", handleCloseAll)
        }
    }, [contextMenu.show])

    const handleContextMenu = (event) => {
        event.preventDefault()

        // Dispatch the event to close any other open context menus
        document.dispatchEvent(new Event("closeAllContextMenus"))

        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        let x = event.pageX
        let y = event.pageY

        // Adjust position if the menu would overflow the window
        if (x + menuDimensions.width > windowWidth) {
            x = windowWidth - menuDimensions.width
        }
        if (y + menuDimensions.height > windowHeight) {
            y = windowHeight - menuDimensions.height
        }

        setContextMenu({
            show: true,
            x,
            y
        })
    }

    const handleClick = (e) => {
        if (menuRef.current && menuRef.current.contains(e.target)) {
            return
        }
        setContextMenu({ show: false, x: 0, y: 0 })
    }

    useEffect(() => {
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const contextMenuElement = contextMenu.show
        ? createPortal(
            <div
                ref={menuRef}
                className="fixed bg-white flex flex-col rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] min-w-[144px] py-2 z-50"
                style={{ top: contextMenu.y, left: contextMenu.x }}
            >
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={async () => {
                        const result = await window.folders.pinFolder(name, id);

                        if (result.status === "success") {
                            setReload((pre) => pre + 1);
                        }

                        if (result.status === "fail") {
                            toast(result.message, "error");
                        }

                        setContextMenu({ show: false, x: 0, y: 0 })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d={Pinned ? "M8,6.2V4H7V2H17V4H16V12L18,14V16H17.8L14,12.2V4H10V8.2L8,6.2M20,20.7L18.7,22L12.8,16.1V22H11.2V16H6V14L8,12V11.3L2,5.3L3.3,4L20,20.7M8.8,14H10.6L9.7,13.1L8.8,14Z" : "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z"} />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        {Pinned ? "Unpin Folder" : "Pin Folder"}
                    </span>
                </button>
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={async () => {
                        setIsModalOpen(true);
                        setContextMenu({ show: false, x: 0, y: 0 })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M21,11.11C20.92,11.11 20.72,11.21 20.62,11.31L19.62,12.31L21.72,14.42L22.72,13.41C22.92,13.21 22.92,12.81 22.72,12.61L21.42,11.31C21.32,11.21 21.22,11.11 21,11.11M19.12,12.91L13,18.92V21H15.12L21.22,14.92L19.12,12.91M21,8V8.11L19,10.11V8H3V18H11V20H3A2,2 0 0,1 1,18V6C1,4.91 1.9,4 3,4H9L11,6H19C20.12,6 21,6.91 21,8Z" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-[rgba(0,0,0,0.87)]">
                        Rename Folder
                    </span>
                </button>
                <button
                    className="px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={async () => {
                        toast(`${name} ${id}`)

                        setContextMenu({ show: false, x: 0, y: 0 })
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="oklch(0.577 0.245 27.325)">
                        <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                    </svg>
                    <span className="leading-6 font-normal text-sm tracking-[0.25px] text-red-600">
                        Delete Folder
                    </span>
                </button>
            </div >,
            document.body
        )
        : null

    return (
        <div
            role="treeitem"
            className="rounded-xl overflow-hidden min-h-[44px]"
        >
            <button
                id={`Folder_${id}`}
                onClick={() => {
                    set("isActive", { name: name, uid: id });
                    navigate(`/Folder/${id}`)
                }}
                className="all-unset cursor-pointer w-full px-4 pr-3 h-11 text-base font-normal rounded-xl font-[Helvetica Neue] flex items-center transition-colors duration-300 hover:bg-[#74748040]"
                onContextMenu={id !== "0000000" ? handleContextMenu : null}
            >
                <div className="flex items-center w-full gap-3 min-w-0 flex-1 min-[inline-size:1px]">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-[30px] h-8">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                        </svg>
                    </span>
                    <span className="flex-1 whitespace-nowrap text-ellipsis overflow-hidden text-left">
                        {name}
                    </span>
                    {Pinned ? <svg viewBox="0 0 24 24" fill="#fbbc04" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg> : ""}
                </div>
            </button>
            {contextMenuElement}

            <FolderModel
                text="Rename Folder"
                placeholder="Enter folder name"
                btnText="Rename"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onFinish={async (folderName) => {
                    const newFolder = await window.folders.rename(name, id, folderName)
                    if (newFolder.status === "success") {
                        toast(newFolder.message);
                        setReload((pre) => pre + 1);
                    }

                    if (newFolder.status === "fail") {
                        toast(newFolder.message, "error")
                        return;
                    }
                    setIsModalOpen(false);
                }}
            />
        </div>
    )
}

export default FolderItem
