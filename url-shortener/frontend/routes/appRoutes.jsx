import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import { useContext } from 'react';

import { AuthContext } from '../store/auth/authContextProvider';

import App from '../src/App';
import Dashboard from '../src/pages/dashboard';

export default function AppRoutes(){

    const { authState } = useContext(AuthContext);

    if (authState?.loading){

        return <div>Loading...</div>;

    }

    return(

        <Routes>
            
            <Route
                path="/"
                element={<App />}
            />

            <Route
                path="/dashboard"
                element={
                    authState?.token
                        ? <Dashboard />
                        : <Navigate to="/" replace />
                }
                
            />

        </Routes>

    );

}