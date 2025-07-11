import React, { useEffect, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { User, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { loginWithGoogle, message, setMessage, error, setError, authenticateUser } = useAuth();

    useEffect(() => {
        authenticateUser();
        setError('');
    }, []);

    const handleLoginWithGoogle = (credentialResponse) => {
        setIsLoading(true);
        try {
            loginWithGoogle(credentialResponse)
            setMessage('Login successful with Google');
            setError('');
        } catch (error) {
            setError('Google login failed. Please try again.');
            console.error('Google login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Harun Regional Database System</h1>
                        <p className="text-gray-600 italic">Login untuk dapat mengakses dashboard</p>
                    </div>

                    {message && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{message}</span>
                        </div>
                    )}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <div className='justify-center flex flex-col items-center gap-4'>
                        <GoogleOAuthProvider clientId="688563352450-ec4arq3viqtdq0uf6o431kn0a8h92djh.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleLoginWithGoogle}
                                onFailure={handleLoginWithGoogle}
                                onError={() => {
                                    setMessage('Google login failed. Please try again.');
                                }}
                                useOneTap
                                size="extraLarge"
                                theme="filled_blue"
                                shape="pill"
                                logo_alignment="center"
                                text="signin_with"
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;