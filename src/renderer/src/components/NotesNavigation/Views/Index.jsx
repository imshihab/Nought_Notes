import { del, get } from 'esmls';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

function Index({ children, isRoot, length = 0 }) {
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const [scrollInfo, setScrollInfo] = useState({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startScrollTop, setStartScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
                setScrollInfo({ scrollTop, scrollHeight, clientHeight });
            }
        };

        const content = contentRef.current;
        if (content) {
            content.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial calculation
        }

        return () => {
            if (content) {
                content.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
        setStartScrollTop(scrollInfo.scrollTop);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        const delta = e.clientY - startY;
        const scrollRatio = scrollInfo.scrollHeight / scrollInfo.clientHeight;
        const scrollDelta = delta * scrollRatio;

        if (contentRef.current) {
            contentRef.current.scrollTop = startScrollTop + scrollDelta;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
        if (!isDragging) {
            setIsHovering(false);
        }
    };

    useEffect(() => {
        if (!isDragging && !isHovering) {
            const timer = setTimeout(() => {
                setIsHovering(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isDragging, isHovering]);

    const scrollbarHeight = Math.max(
        (scrollInfo.clientHeight / scrollInfo.scrollHeight) * scrollInfo.clientHeight,
        40
    );
    const scrollbarTop = (scrollInfo.scrollTop / scrollInfo.scrollHeight) * scrollInfo.clientHeight;

    return (
        <div className={`w-[320px] ${!isRoot ? 'translate-x-[320px]' : 'translate-x-[0px]'} h-[calc(100vh-64px)] transform-gpu absolute inset-0 transition-transform duration-150 ease-in-out`}>
            <div className="w-full h-[52px] box-border px-3 grid grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center sticky top-0 z-[4]">
                <div className="flex items-center h-[52px] justify-start">
                    <button
                        onClick={() => {
                            navigate("/")
                            del("isActive")
                        }}
                        className="all-unset flex justify-center items-center h-[40px] w-[40px] cursor-pointer rounded hover:bg-black/[0.073] active:bg-black/[0.086] active:translate-y-[1px] transition-[background-color,transform] duration-200 ease-in-out"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                </div>
                <div className="folder__title leading-[52px] truncate overflow-x-hidden whitespace-nowrap h-[52px] px-3 cursor-default font-['Helvetica_Neue',sans-serif] text-base font-semibold">
                    {get("isActive")?.name}
                </div>
                <div className="flex items-center h-[52px] justify-end">
                    <span className="folder__title-count text-xs text-black/60 font-medium px-2 bg-[#f5f5f5] rounded-xl inline-block align-middle h-6 leading-6">
                        {length}
                    </span>
                </div>
            </div>
            {length === 0 ? (
                <div className="h-[calc(100%-52px)] flex flex-1 justify-center items-center text-[#000000a8] font-['Helvetica_Neue',sans-serif] text-base font-normal select-none">
                    <div className="fullbleed">No Notes</div>
                </div>
            ) : (
                <div
                    className="relative select-none"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div
                        ref={contentRef}
                        className="relative isolate w-full h-[calc(100vh-64px-52px)] overflow-y-auto overflow-x-hidden py-2 flex flex-col items-center gap-2 leading-[18px] hide-scrollbar"
                    >
                        {children}
                    </div>
                    {scrollInfo.scrollHeight > scrollInfo.clientHeight && (
                        <div
                            className="absolute right-2 top-0 w-[8px] h-full pointer-events-none select-none"
                            style={{
                                opacity: isDragging || isHovering ? 1 : 0,
                                transition: 'opacity 0.3s ease'
                            }}
                        >
                            <div
                                className="absolute w-full pointer-events-auto select-none"
                                style={{
                                    height: `${scrollbarHeight}px`,
                                    transform: `translateY(${scrollbarTop}px)`,
                                    transition: isDragging ? 'none' : 'all 0.2s ease',
                                    background: 'linear-gradient(135deg, rgba(103, 80, 164, 0.08), rgba(103, 80, 164, 0.12))',
                                    borderRadius: '8px',
                                    backdropFilter: 'blur(4px)',
                                    boxShadow: isDragging || isHovering
                                        ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.14), inset 0 0 0 1px rgba(103, 80, 164, 0.2)'
                                        : 'none',
                                    cursor: 'pointer'
                                }}
                                onMouseDown={handleMouseDown}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Index
