import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';

function GoogleAuth({ onMessage, buttonText = "Sign in with Google" }) {
    const { setLoggedUser } = useContext(UserContext);
    const navigate = useNavigate();
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!googleClientId) {
        return (
            <button
                disabled
                type="button"
                className="google-btn"
                title="Google Client ID not configured"
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
            >
                {buttonText} (Not Configured)
            </button>
        );
    }

    const login = useGoogleLogin({
        flow: 'implicit',
        onSuccess: async (tokenResponse) => {
            try {
                console.log('Google Auth Response:', tokenResponse);
                console.log('Credential:', tokenResponse.credential);
                console.log('Access Token:', tokenResponse.access_token);

                // Try different token fields
                const token = tokenResponse.credential || tokenResponse.access_token || tokenResponse.id_token;

                if (!token) {
                    console.error('No token found in response');
                    onMessage({ type: 'error', text: 'No authentication token received' });
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/google-auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (response.ok) {
                    onMessage({ type: 'Success', text: data.message || 'Google authentication successful! Redirecting...' });
                    
                    localStorage.setItem('nutrify-user', JSON.stringify(data));
                    setLoggedUser(data);
                    
                    setTimeout(() => {
                        navigate('/track');
                    }, 1500);
                } else {
                    onMessage({ type: 'error', text: data.message || 'Google authentication failed' });
                    setTimeout(() => {
                        onMessage({ type: 'invisible-msg', text: 'dummy' });
                    }, 5000);
                }
            } catch (error) {
                console.error('Google Auth Error:', error);
                onMessage({ type: 'error', text: 'Network error. Please try again.' });
                setTimeout(() => {
                    onMessage({ type: 'invisible-msg', text: 'dummy' });
                }, 5000);
            }
        },
        onError: () => {
            console.log('Google login failed');
            onMessage({ type: 'error', text: 'Google Sign-In failed. Please try again.' });
            setTimeout(() => {
                onMessage({ type: 'invisible-msg', text: 'dummy' });
            }, 5000);
        },
    });

    return (
        <button
            onClick={() => login()}
            type="button"
            className="google-btn"
        >
            {buttonText}
        </button>
    );
}

export default GoogleAuth;
