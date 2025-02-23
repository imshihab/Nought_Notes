import React from 'react'
import { NavLink } from 'react-router'

const NavItem = ({ to, label, activePath, inactivePath, viewBox = '0 0 24 24', onClick }) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex flex-col items-center justify-start h-14 min-h-14 max-h-14 w-20 min-w-20 max-w-20 border-none outline-none bg-transparent gap-1 relative`
            }
        >
            {({ isActive }) => (
                <>
                    <div
                        className={`h-8 min-h-8 max-h-8 w-14 min-w-14 max-w-14 p-1 px-4 relative overflow-hidden rounded-[24px] after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-1/2 after:h-full after:bg-[#E8DEF8] after:rounded-[24px] after:z-0 after:-translate-x-1/2 after:transition-[width,opacity] after:duration-200 after:ease-in-out ${isActive
                            ? 'after:w-full after:opacity-100'
                            : 'after:w-0 after:opacity-0'
                            }`}
                    >
                        <svg
                            className="w-6 min-w-6 max-w-6 h-6 min-h-6 max-h-6 fill-[#4A4459] relative z-1"
                            viewBox={viewBox}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d={isActive ? activePath : inactivePath} />
                        </svg>
                    </div>
                    <span
                        className={`text-xs leading-4 font-roboto ${isActive ? 'text-[#1D1B20] font-semibold' : 'font-normal text-[#242a31]'}`}
                    >
                        {label}
                    </span>
                </>
            )}
        </NavLink>
    )
}

export default NavItem
