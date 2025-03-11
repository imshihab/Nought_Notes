import React, { useEffect, useState } from "react"
import { useLocation } from "react-router"
import FolderItem from "./FolderItem"
import FolderModel from "./FolderModel"
import quickSort from "../Helper/quickSort"
import toast from "../Libs/toast"

function FolderContainer({ reload, setReload }) {
    const location = useLocation()
    const isRoot = location.pathname === "/"
    const [folders, setFolders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        ; (async () => {
            const folders = await window.folders.fetch()
            setFolders(folders)
        })()
    }, [reload])

    const sort = quickSort(folders)
    return (
        <>
            <div
                className={`w-[320px] h-[calc(100svh-72px)] transform-gpu absolute inset-0 transition-transform duration-150 ease-in-out ${isRoot ? "translate-x-[0px]" : "translate-x-[-320px]"} bg-white`}
            >
                <div className="relative">
                    <div className="px-4 py-2 sticky top-0 z-2 h-[72px]">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center bg-white rounded-2xl border-0 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] box-border text-[rgb(60,64,67)] cursor-pointer fill-[rgb(60,64,67)] gap-3 h-14 min-w-[6.25rem] px-4 py-[1.125rem] place-content-center justify-start transition-shadow duration-[0.08s] linear select-none"
                        >
                            <svg width="24px" height="24px" viewBox="0 0 24 24">
                                <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z" />
                            </svg>
                            <span>New Folder</span>
                        </button>
                    </div>
                    <div
                        className="h-[calc(100svh-72px-72px)] overflow-y-auto overflow-x-hidden py-4 px-3 flex flex-col gap-1"
                        role="tree"
                    >
                        {sort.map((folder) => (
                            <FolderItem folder={folder} key={folder.id} setReload={setReload} />
                        ))}
                    </div>
                </div>
            </div>

            <FolderModel
                text="New Folder"
                placeholder="Enter folder name"
                btnText="Create"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onFinish={async (folderName) => {
                    const newFolder = await window.folders.create(folderName)
                    if (newFolder.status === "success") {
                        toast(newFolder.message);
                        setReload((pre) => pre + 1);
                        setIsModalOpen(false);
                    }

                    if (newFolder.status === "fail") {
                        toast(newFolder.message, "error")
                        return;
                    }
                }}
            />
        </>
    )
}

export default FolderContainer
