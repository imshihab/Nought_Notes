import React, { useState } from "react"
import Sidebar from "./components/SideBar"
import TopBar from "./components/TopBar"
import NotesNavigation from "./components/NotesNavigation/NotesNavigation"
import { get } from "esmls";

function App() {
    const [reload, setReload] = useState(0);
    const [activeFolder, setActiveFolder] = useState(get("isActive") || { name: "", uid: "" });
    return (
        <>
            <Sidebar setActiveFolder={setActiveFolder} activeFolder={activeFolder} />
            <div className="flex flex-col flex-1">
                <TopBar />
                <div className="flex flex-1 rounded-t-[24px] px-2 gap-2 pt-2 m-0 bg-[#f2faff]">
                    <NotesNavigation reload={reload} setReload={setReload} activeFolder={setActiveFolder} setActiveFolder={setActiveFolder} />
                </div>
            </div>
        </>
    )
}

export default App
