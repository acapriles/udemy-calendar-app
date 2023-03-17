import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CaleandarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();
    //const authStatus = 'not-authenticated';  // 'checking'; // 'authenticated' // 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, []);
    

    if ( status === 'checking' ) {
        <h3>Loading...</h3>
    }


    return (
        <Routes>
            {
                (status === 'not-authenticated')
                ? 
                    (
                        <>
                            <Route path="auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />                
                        </>
                    )
                : 
                    (
                        <>
                            <Route path="/" element={ <CaleandarPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />                
                        </>
                    )
                    
            }
        </Routes>
    )
}
