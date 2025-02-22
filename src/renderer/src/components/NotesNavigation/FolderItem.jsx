import React from "react"

function FolderItem({ name, id }) {
    return (
        <div role="treeitem" className="rounded-xl overflow-hidden min-h-[44px]">
            <button
                id={`Folder_${id}`}
                className="all-unset w-full px-4 pr-3 h-11 text-base font-normal rounded-xl font-[Helvetica Neue] flex items-center transition-colors duration-300 hover:bg-[#74748040]"
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
        </div>
    )
}

export default FolderItem
