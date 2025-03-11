import { useState, useEffect, memo } from "react"

const WindowControls = () => {
    const [isMaximized, setIsMaximized] = useState(false)

    useEffect(() => {
        window.api.checkWindowState()

        window.api.onWindowMaximized(() => setIsMaximized(true))
        window.api.onWindowRestored(() => setIsMaximized(false))

        return () => {
            window.api.removeWindowMaximizedListener()
            window.api.removeWindowRestoredListener()
        }
    }, [])

    return (
        <div
            className="flex items-center h-[40px] !mr-4 gap-1.5"
            style={{ WebkitAppRegion: "no-drag" }}
        >
            <button
                className="w-[32px] h-[32px] cursor-pointer flex items-center justify-center rounded hover:bg-gray-200"
                onClick={() => window.api.minimizeApp()}
                aria-label="Minimize"
                role="button"
                important="true"
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[24px] w-[24px]"
                >
                    <path d="M240-120v-80h480v80H240Z" />
                </svg>
            </button>

            <button
                className="w-[32px] h-[32px] cursor-pointer flex items-center justify-center rounded hover:bg-gray-200"
                important="true"
                onClick={() => window.api.maximizeApp()}
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[24px] w-[24px]"
                >
                    <path
                        d={
                            isMaximized
                                ? "M320-80q-33 0-56.5-23.5T240-160v-80h-80q-33 0-56.5-23.5T80-320v-40q0-17 11.5-28.5T120-400q17 0 28.5 11.5T160-360v40h80v-320q0-33 23.5-56.5T320-720h320v-80h-40q-17 0-28.5-11.5T560-840q0-17 11.5-28.5T600-880h40q33 0 56.5 23.5T720-800v80h80q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H320Zm0-80h480v-480H320v480ZM120-480q-17 0-28.5-11.5T80-520v-80q0-17 11.5-28.5T120-640q17 0 28.5 11.5T160-600v80q0 17-11.5 28.5T120-480Zm0-240q-17 0-28.5-11.5T80-760v-40q0-33 23.5-56.5T160-880h40q17 0 28.5 11.5T240-840q0 17-11.5 28.5T200-800h-40v40q0 17-11.5 28.5T120-720Zm240-80q-17 0-28.5-11.5T320-840q0-17 11.5-28.5T360-880h80q17 0 28.5 11.5T480-840q0 17-11.5 28.5T440-800h-80Zm-40 640v-480 480Z"
                                : "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"
                        }
                    />
                </svg>
            </button>

            <button
                className="w-[32px] h-[32px] cursor-pointer flex items-center justify-center  hover:bg-red-500 hover:text-white rounded"
                onClick={() => window.api.closeApp()}
                aria-label="Close"
                role="button"
                important="true"
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[24px] w-[24px]"
                >
                    <path d="M481-442 272-232q-9 9-19.5 9T232-233q-9-10-8.5-19t9.5-19l208-209-209-211q-8-9-8.5-18.5T232-729q10-10 20-10.5t20 9.5l209 210 207-210q9-9 19.5-9t20.5 10q9 10 8.5 19t-9.5 19L519-480l208 209q8 8 9 18t-8 20q-10 10-20 10.5t-20-9.5L481-442Z" />
                </svg>
            </button>
        </div>
    )
}

export default memo(WindowControls)
