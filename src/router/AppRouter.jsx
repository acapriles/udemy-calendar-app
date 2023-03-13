import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CaleandarPage } from "../calendar";

export const AppRouter = () => {

    const authStatus = 'authenticated';

    return (
        <Routes>
            {
                (authStatus === 'not-authenticated')
                    ? <Route path="auth/*" element={ <LoginPage /> } />
                    : <Route path="/*" element={ <CaleandarPage /> } />
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
