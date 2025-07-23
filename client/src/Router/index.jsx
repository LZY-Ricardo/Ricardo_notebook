import { BrowserRouter, Routes, Route, Navigate, useRoutes } from 'react-router'
import React from 'react'

const Login = React.lazy(() => import('../pages/Login'))

const routes = [
    {
        path: '/',
        element: <Navigate to="/noteClass" />
    },
    {
        path: '/login',
        element: <Login />
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