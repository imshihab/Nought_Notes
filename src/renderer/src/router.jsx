import { createBrowserRouter } from 'react-router'
import App from './App'
import ErrorPage from './components/Error'

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '',
                Component: App
            }
            // {
            //     path: "/Post/:id",
            //     Component: Postid,
            // },
            // {
            //     path: '/Projects/:id?', // Optional Params
            //     Component: Postid
            // }
        ]
    },
    {
        path: '*', // wildcard
        Component: App
    }
])

export default router
