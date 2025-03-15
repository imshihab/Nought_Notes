import React, { memo, useState, useCallback } from "react";
import WindowControls from "./WindowControls";
import SearchInput from "./SearchInput";

const TopBar = () => {
    const [searchValue, setSearchValue] = useState("");
    const handleSearchChange = useCallback((e) => {
        setSearchValue(e.target.value);
    }, []);

    return (
        <div
            className="w-full bg-[#f2faff] max-h-16 min-h-16 px-2 flex items-center gap-2 pr-0"
            style={{ WebkitAppRegion: "drag" }}
        >
            <div className="flex items-center gap-2 flex-grow">
                <div id="NoughtLogo" className="noDrag"></div>
                <SearchInput
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>
            <WindowControls />
        </div>
    );
};

export default memo(TopBar);
