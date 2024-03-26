import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../Pages/Login/LoginPage'
import { SubgroupsPage } from '../Pages/Subgroups/SubgroupsPage'


export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/subgroups' element={<SubgroupsPage />} />
            </Routes>
        </BrowserRouter>
    )
}