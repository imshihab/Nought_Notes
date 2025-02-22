import React, { useState } from "react"
import NoteList from "./components/NoteList"
import ContentView from "./components/ContentView"
import Sidebar from "./components/SideBar"
import TopBar from "./components/TopBar"
import NotesNavigation from "./components/NotesNavigation/NotesNavigation"

function App() {
    return (
        <>
            <Sidebar />
            <div className="flex flex-col flex-1">
                <TopBar />
                <div className="flex flex-1 rounded-t-[24px] px-2 gap-2 pt-2 m-0 bg-[#f2faff]">
                    <NotesNavigation />
                </div>
            </div>
        </>
    )
}

export default App
