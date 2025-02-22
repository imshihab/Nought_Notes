import React from 'react'
import ErrorI from '../assets/Error.svg'
import { useNavigate } from 'react-router'
import WindowControls from './TopBar/WindowControls'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="fixed drag left-0 right-0 top-0 z-50 h-[64px] flex items-center justify-end">
                <WindowControls />
            </div>
            <div className="min-h-screen !min-w-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center gap-4">
                <img src={ErrorI} alt="App Error" className="w-72 md:w-96" />
                <h1 className="text-4xl font-bold text-gray-800 mt-6">Oops! The App Has Crashed</h1>
                <p className="text-gray-600 mt-3">
                    Something went wrong with the application. Please try restarting.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Take Me Home
                </button>
            </div>
        </>
    )
}

export default ErrorPage
