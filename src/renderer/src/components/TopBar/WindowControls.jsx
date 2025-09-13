import { useState, useEffect, memo } from "react";

const WindowControls = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        window.api.checkWindowState();

        const onMaximized = () => setIsMaximized(true);
        const onRestored = () => setIsMaximized(false);

        window.api.onWindowMaximized(onMaximized);
        window.api.onWindowRestored(onRestored);

        return () => {
            window.api.removeWindowMaximizedListener(onMaximized);
            window.api.removeWindowRestoredListener(onRestored);
        };
    }, []);

    const buttonBaseClasses =
        "w-[32px] h-[32px] cursor-pointer flex items-center justify-center rounded-[8px] transition-color duration-300 ease-in-out";

    const svgBaseClasses = "w-[16px] h-[16px]";

    return (
        <div
            className="flex items-center h-[40px] !mr-4 gap-1.5"
            style={{ WebkitAppRegion: "no-drag" }}
        >
            <button
                className={`${buttonBaseClasses} bg-slate-200 text-slate-800 hover:bg-slate-300`}
                onClick={() => {/* Add your settings handler here */ }}
                aria-label="Settings"
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className={svgBaseClasses}
                >
                    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                </svg>
            </button>


            <div className="w-[2px] h-[24px] bg-slate-200 !ml-2 !mr-2"></div>


            <button
                className={`${buttonBaseClasses} bg-slate-200 text-slate-800 hover:bg-slate-300`}
                onClick={() => window.api.minimizeApp()}
                aria-label="Minimize"
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className={svgBaseClasses}
                >
                    <path d="M240-440v-80h480v80H240Z" />
                </svg>
            </button>

            <button
                className={`${buttonBaseClasses} bg-slate-200 text-slate-800 hover:bg-slate-300`}
                onClick={() => window.api.maximizeApp()}
                aria-label="Maximize or Restore"
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className={svgBaseClasses}
                >
                    <path
                        d={
                            isMaximized
                                ? "M320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"
                                : "M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"
                        }
                    />
                </svg>
            </button>

            <button
                className={`${buttonBaseClasses} bg-red-100 text-red-700 hover:bg-red-200`}
                onClick={() => window.api.closeApp()}
                aria-label="Close"
            >
                <svg
                    viewBox="0 -960 960 960"
                    xmlns="http://www.w3.org/2000/svg"
                    className={svgBaseClasses}
                >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
            </button>
        </div>
    );
};

export default memo(WindowControls);
