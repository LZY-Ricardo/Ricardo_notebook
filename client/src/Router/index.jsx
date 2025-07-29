import { BrowserRouter, Routes, Route, Navigate, useRoutes } from 'react-router'
import React from 'react'

// 路由懒加载
const Login = React.lazy(() => import('../pages/Login'))
const NoteClass = React.lazy(() => import('../pages/NoteClass'))
const Register = React.lazy(() => import('../pages/Register'))
const NoteList = React.lazy(() => import('../pages/NoteList'))
const NoteDetail = React.lazy(() => import('../pages/NoteDetail'))

const routes = [
    {
        path: '/',
        element: <Navigate to="/noteClass" />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/noteClass',
        element: <NoteClass />
    },
    {
        path: '/noteList',
        element: <NoteList />
    },
    {
        path: '/noteDetail',
        element: <NoteDetail />
    }
]

function WrapperRoutes() {
    // useRoutes 这个 hook 函数只能用在路由组件中, 也就是说, 该组件不能被抛出
    let ele = useRoutes(routes) // <Routes></Routes>
    return ele
}

export default function WrapperRouter() {
    return (
        <BrowserRouter>
            <WrapperRoutes />
        </BrowserRouter>
    )
}