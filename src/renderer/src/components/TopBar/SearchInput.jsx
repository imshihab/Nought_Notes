import React, { memo } from 'react';

const SearchInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search Notes..."
            className="border border-green-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 noDrag"
            value={value}
            onChange={onChange}
        />
    );
};

export default memo(SearchInput);
