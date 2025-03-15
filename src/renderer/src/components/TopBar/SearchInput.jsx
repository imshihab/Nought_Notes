import React, { memo } from 'react';

const SearchInput = ({ value, onChange }) => {
    return (
        <div className="relative flex items-center max-w-[720px]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-5 w-[20px] h-[20px] text-black/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
                type="text"
                placeholder="Search Notes..."
                className="w-full h-[48px] pl-[52px] pr-5 bg-white rounded-[24px] text-base placeholder:text-black/60 outline-none border-[1px] border-transparent transition-all duration-200 ease-in-out noDrag"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

SearchInput.displayName = 'SearchInput';
export default memo(SearchInput);
