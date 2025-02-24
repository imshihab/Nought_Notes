import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { createPortal } from "react-dom"
import toast from "../Libs/toast"
import { set } from "esmls"

function FolderItem({ name, id }) {
    const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 })
    const menuRef = useRef(null)
    const [menuDimensions, setMenuDimensions] = useState({ width: 150, height: 100 })
    const navigate = useNavigate()

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
                className="fixed bg-white rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] min-w-[144px] py-2 z-50"
                style={{ top: contextMenu.y, left: contextMenu.x }}
            >
                <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={async () => {
                        toast(`${name} ${id}`)

                        setContextMenu({ show: false, x: 0, y: 0 })
                    }}
                >
                    PIN
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={async () => {
                        toast(`${name} ${id}`)


                        setContextMenu({ show: false, x: 0, y: 0 })
                    }}
                >Rename</button>
                <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={async () => {
                        toast(`${name} ${id}`)

                        setContextMenu({ show: false, x: 0, y: 0 })
                    }}
                >
                    Delete
                </button>
            </div>,
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
                className="all-unset w-full px-4 pr-3 h-11 text-base font-normal rounded-xl font-[Helvetica Neue] flex items-center transition-colors duration-300 hover:bg-[#74748040]"
                onContextMenu={id !== "0000000" ? handleContextMenu : null}
            >
                <div className="flex items-center w-full gap-4 min-w-0 cursor-pointer flex-1 min-[inline-size:1px]">
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
                </div>
            </button>
            {contextMenuElement}
        </div>
    )
}

export default FolderItem
