import WindowControls from './WindowControls'

export default function TopBar() {
    return (
        <div
            className="w-full bg-white max-h-16 min-h-16 px-2 flex items-center gap-2 pr-0"
            style={{ WebkitAppRegion: 'drag' }}
        >
            <div className="flex items-center gap-2 flex-grow">
                <div id="NoughtLogo" className="noDrag"></div>
                <input
                    type="text"
                    placeholder="Search Notes..."
                    className="border border-green-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 noDrag"
                />
            </div>

            <WindowControls />
        </div>
    )
}
