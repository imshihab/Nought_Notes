import React from 'react'
import NavItem from './NavItem'
import { get, set } from 'esmls';
import { useNavigate } from 'react-router';

export default function Sidebar() {
    return (
        <div className="w-20 min-w-20 max-w-20 h-screen min-h-screen max-h-screen m-0 p-2 pb-14 gap-10 flex flex-col items-center bg-[#f2faff]">
            <nav className="w-20 min-w-20 max-w-20 flex flex-col items-center gap-6">
                <button className="w-12 min-w-12 max-w-12 h-12 min-h-12 max-h-12 m-0 p-3 border-none outline-none hover:bg-black/[0.073] hover:cursor-pointer rounded-lg transition-colors duration-200">
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        fill="#49454F"
                    >
                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"></path>
                    </svg>
                </button>

                <button className="w-14 min-w-14 max-w-14 h-14 min-h-14 max-h-14 m-0 p-4 rounded-2xl border-none outline-none bg-[#FFD8E4]">
                    <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                    >
                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
                    </svg>
                </button>
            </nav>
            <nav className="flex flex-col items-center justify-start w-20 min-w-20 max-w-20 gap-3">
                <NavItem
                    to="/Folder/0000000"
                    name="Notes"
                    label="Notes"
                    inactivePath="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54h-82l-7-40-433 77 40 226v279q-16-9-27.5-24T158-276L81-710Zm279 110v440h280v-160h160v-280H360Zm220 220Z"
                    activePath="M280-160v-441q0-33 24-56t57-23h439q33 0 56.5 23.5T880-600v320L680-80H360q-33 0-56.5-23.5T280-160ZM81-710q-6-33 13-59.5t52-32.5l434-77q33-6 59.5 13t32.5 52l10 54H360q-66 0-113 47t-47 113v382q-16-9-27.5-24T158-276L81-710Zm719 390H640v160l160-160Z"
                    viewBox="0 -960 960 960"
                />
                <NavItem
                    to="/Archives"
                    name="Archives"
                    label="Archives"
                    inactivePath="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M9.5 11H14.5C14.78 11 15 11.22 15 11.5V13H9V11.5C9 11.22 9.22 11 9.5 11M5 5V7H19V5H5Z"
                    activePath="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z"
                />
                <NavItem
                    to="/Favorites"
                    name="Favorites"
                    label="Favorites"
                    inactivePath="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
                    activePath="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
                    viewBox="0 -960 960 960"
                />
                <NavItem
                    to="/Trash"
                    name="Trash"
                    label="Trash"
                    inactivePath="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                    activePath="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
                />
                <NavItem
                    to="/Locked"
                    name="Locked"
                    label="Locked"
                    inactivePath="M720-240q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-18-6-37.5-9t-42.5-3v-40H240v400h212q8 24 16 41.5T490-80Zm230 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM240-560v400-400Z"
                    activePath="M360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM490-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v52q-20-7-40-9.5t-40-2.5q-117 0-198.5 81.5T440-240q0 43 13.5 83.5T490-80Zm230-160q25 0 42.5-17.5T780-300q0-25-17.5-42.5T720-360q-25 0-42.5 17.5T660-300q0 25 17.5 42.5T720-240Zm0 120q30 0 56-14t43-39q-23-14-48-20.5t-51-6.5q-26 0-51 6.5T621-173q17 25 43 39t56 14Z"
                    viewBox="0 -960 960 960"
                />
            </nav>
        </div>
    )
}
