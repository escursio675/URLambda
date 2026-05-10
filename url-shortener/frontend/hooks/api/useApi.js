import {
    useState,
    useContext
} from 'react';

import {
    AuthContext
} from '../../store/auth/authContextProvider';

const BASE_URL = import.meta.env.VITE_API_URL;

export default function useApi(){

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const {
        authState,
        logout
    } = useContext(AuthContext);

    const request = async (
        endpoint,
        options = {}
    ) => {

        setLoading(true);

        setError(null);

        try {

            const headers = {
                ...(options.headers || {})
            };

            if (authState?.token) {

                headers.Authorization =
                    `Bearer ${authState.token}`;

            }

            const response = await fetch(
                `${BASE_URL}${endpoint}`,
                {
                    ...options,
                    headers
                }
            );

            const data = await response.json();

            if (!response.ok) {

                if (response.status === 401) {

                    logout();

                }

                throw new Error(
                    data.error || 'Request failed'
                );

            }

            return data;

        } catch(err){

            setError(err.message);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    return {
        loading,
        error,
        request
    };

}