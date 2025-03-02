import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import logo from './delete.svg'

export default function FolderModel({ folderName, onDelete, onClose, isDeleteModalOpen }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const isEmpty = await window.folders.isEmpty(folderName);
            if (isEmpty) {
                onDelete();
                onClose();
            } else {
                setIsLoading(false);
            }
        })();
    }, [folderName, onDelete, onClose]);

    return isDeleteModalOpen && !isLoading ? createPortal(
        <div
            className="fixed top-0 left-0 w-[100svw] h-[100svh] bg-[#00000080] flex justify-center items-center z-[1000]"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white flex flex-col items-center gap-4 rounded-[24px] p-6 w-[90%] max-w-[600px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_4px_8px_3px_rgba(0,0,0,0.1)] animate-fadeIn">
                <h4 className="text-[24px] font-[500] text-[#242a31] overflow-hidden whitespace-nowrap text-ellipsis">
                    Do you really want to delete this folder {folderName}?
                </h4>
                <img src={logo} className="w-2xs h-2xs" alt="Logo" />
                <div className="flex gap-4">
                    <button
                        className="bg-gray-500 text-white rounded px-4 py-2 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white rounded px-4 py-2 cursor-pointer"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    ) : null;
}
