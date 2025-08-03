import { BrowserRouter, Routes, Route, Navigate, useRoutes } from 'react-router-dom'
import React from 'react'

// 路由懒加载
const Login = React.lazy(() => import('../pages/Login'))
const NoteClass = React.lazy(() => import('../pages/NoteClass'))
const Register = React.lazy(() => import('../pages/Register'))
const NoteList = React.lazy(() => import('../pages/NoteList'))
const NoteDetail = React.lazy(() => import('../pages/NoteDetail'))
const NotePublic = React.lazy(() => import('../pages/NotePublic'))
const Search = React.lazy(() => import('../pages/Search'))
const NoteEdit = React.lazy(() => import('../pages/NoteEdit'))
const NoteLike = React.lazy(() => import('../pages/NoteLike'))
const NoteStatistics = React.lazy(() => import('../pages/NoteStatistics'))
const Personal = React.lazy(() => import('../pages/Personal'))

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
    },
    {
        path: '/notePublic',
        element: <NotePublic />
    },
    {
        path: '/search',
        element: <Search />
    },
    {
        path: '/noteEdit',
        element: <NoteEdit />
    },
    {
        path: '/noteLike',
        element: <NoteLike />
    },
    {
        path: '/noteStatistics',
        element: <NoteStatistics />
    },
    {
        path: '/personal',
        element: <Personal />
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