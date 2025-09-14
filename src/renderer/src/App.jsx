import React, { useState, memo } from "react"
import Sidebar from "./components/SideBar"
import TopBar from "./components/TopBar"
import NotesNavigation from "./components/NotesNavigation/NotesNavigation"

function App() {
    const [reload, setReload] = useState(0);
    return (
        <>
            <Sidebar />
            <div className="flex flex-col flex-1">
                <TopBar />
                <div className="flex flex-1 m-0 bg-[#f2faff]">
                    <NotesNavigation reload={reload} setReload={setReload} />
                    {/* Will be removed */}
                    <main className="flex-1 px-3 flex items-center justify-center">
                        <div className="max-w-[900px] w-full mx-auto bg-white rounded-t-[24px] min-h-[calc(100vh-64px)] p-6 flex items-center justify-center">
                            <div className="flex items-center justify-center flex-col text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                </svg>
                                <p className="text-lg font-medium">Select a note to start editing</p>
                                <p className="text-sm mt-1">Choose a note from the sidebar or create a new one</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default memo(App)
