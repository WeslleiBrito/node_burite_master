import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../Pages/Login/LoginPage'


export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}