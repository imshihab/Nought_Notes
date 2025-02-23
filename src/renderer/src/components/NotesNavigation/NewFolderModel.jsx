import { useState, useEffect, useRef } from "react"
import toast from "../Libs/toast"

export default function NewFolderModal({ isOpen, onClose, onFinish }) {
    const [folderName, setFolderName] = useState("")
    const maxChars = 32
    const inputRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [isOpen])

    const handleInputChange = (e) => {
        setFolderName(e.target.value.slice(0, maxChars))
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newFolder = await window.folders.create(folderName)
        if (newFolder.status === "success") {
            toast(newFolder.message)
        }

        if (newFolder.status === "fail") {
            toast(newFolder.message, "error")
            return
        }
        onFinish()
        setFolderName("")
        onClose()
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed top-0 left-0 w-[100svw] h-[100svh] bg-[#00000080] flex justify-center items-center z-[1000]"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose()
                }
            }}
        >
            <div className="bg-white flex flex-col gap-4 rounded-[24px] p-6 w-[90%] max-w-[400px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_4px_8px_3px_rgba(0,0,0,0.1)] animate-fadeIn">
                <h3 className="text-[24px] font-[500] text-[#242a31] overflow-hidden whitespace-nowrap text-ellipsis">
                    New Folder
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
                    <input
                        type="text"
                        className="w-full px-4 pr-9 h-[56px] border-2 border-[#dfe0e4] rounded focus:border-blue-500 focus:shadow-[0_0_0_0.2rem_rgba(33,150,243,0.25)] text-base outline-none transition-all duration-150 placeholder-[#999]"
                        value={folderName}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter folder name"
                        required
                        ref={inputRef}
                    />
                    <div className="absolute right-4 top-[28px] -translate-y-1/2 text-xs text-gray-400">
                        <span id="charCount">
                            {folderName.length}/{maxChars}
                        </span>
                    </div>
                    <div className="relative flex flex-shrink-0 flex-wrap items-center justify-end box-border min-h-[48px] m-0 p-0 gap-4">
                        <button
                            className="relative cursor-pointer inline-flex items-center justify-center box-border h-10 min-w-[64px] p-[10px] px-3 rounded-[24px] select-none appearance-none overflow-visible align-middle bg-transparent border-none outline-none hover:text-[#0b57d0] hover:bg-[#0b57d014]"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-5 py-2 rounded-[24px] font-medium transition-all duration-200 ${
                                folderName
                                    ? "text-white bg-[#0b57d0] hover:bg-[#0946a7] cursor-pointer"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!folderName}
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
