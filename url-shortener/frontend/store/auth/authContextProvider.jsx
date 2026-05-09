import {
    createContext,
    useReducer,
    useEffect
} from 'react';

import authReducer, {
    defaultAuthState
} from './authReducer';

import {
    LOGIN,
    LOGOUT
} from './authActions';

export const AuthContext = createContext({
    authState: defaultAuthState,
    login: () => {},
    logout: () => {}
});

export const AuthContextProvider = ({ children }) => {

    const reducerResult = useReducer(authReducer, defaultAuthState);
    
    const authState = reducerResult[0];
    const dispatch = reducerResult[1];

    const logout = () => {

        dispatch({
            type: LOGOUT
        });

    };

    useEffect(() => {

        const token = localStorage.getItem('token');

        const user = localStorage.getItem('user');

        if (!token || !user) {

            logout();

        return;
        }
        
        const verifyUser = async () => {

            try{
                const response = await fetch(
                'http://localhost:5000/auth/verify',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok)  {throw new Error('Token verification failed');}  

            dispatch({
                type: LOGIN,
                payload: {
                    token,
                    user: JSON.parse(user)
                }
            });
    
        } catch(err){   

            logout();
        }

        };
        verifyUser();

    }, []);

    useEffect(() => {

        const syncLogout = (event) => {

            if(event.key === 'token'){

                if(!event.newValue){

                    dispatch({
                        type: LOGOUT
                    });

                }

            }

        };

        window.addEventListener(
            'storage',
            syncLogout
        );

        return () => {

            window.removeEventListener(
                'storage',
                syncLogout
            );

        };

    }, []);

    const login = (token, user) => {

        dispatch({
            type: LOGIN,
            payload: {
                token,
                user
            }
        });

    };

    return (

        <AuthContext.Provider
            value={{
                authState,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};