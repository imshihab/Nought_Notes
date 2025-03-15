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
                    <main className="flex-1 px-3">
                        <div className="max-w-[900px] mx-auto bg-white rounded-t-[24px] min-h-[calc(100vh-64px)] p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-[#1a73e8]"></div>
                                    <span className="text-sm font-medium text-[#1a73e8]">Personal</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/[0.05] active:bg-black/[0.08] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                        </svg>
                                    </button>
                                    <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/[0.05] active:bg-black/[0.08] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z" />
                                        </svg>
                                    </button>
                                    <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-black/[0.05] active:bg-black/[0.08] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="w-full text-[32px] font-['Helvetica_Neue',sans-serif] font-bold leading-tight outline-none border-none placeholder:text-black/20"
                                    value="Meeting Notes - Q4 Planning"
                                    readOnly
                                />
                                <div className="flex items-center gap-2 text-sm text-black/60">
                                    <span>Last edited</span>
                                    <span>•</span>
                                    <span>Oct 15, 2023</span>
                                </div>
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-lg text-black/80 leading-relaxed">
                                        Key discussion points from today's quarterly planning meeting:
                                    </p>
                                    <ul className="space-y-2 text-black/80">
                                        <li>Review of Q3 performance metrics and KPIs</li>
                                        <li>Discussion of upcoming product launches</li>
                                        <li>Resource allocation for new initiatives</li>
                                        <li>Budget planning for the next fiscal year</li>
                                    </ul>
                                    <p className="text-lg text-black/80 leading-relaxed mt-6">
                                        Next steps include finalizing the budget proposal and scheduling follow-up meetings with individual team leads to discuss specific deliverables.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default memo(App)
