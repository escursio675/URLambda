import { GoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../store/auth/authContextProvider';

import Form from "../components/form";
// 1. Import the new background
import SoftAurora from "../components/SoftAurora";
// 2. Import the new text animation component
import TextType from "../components/TextType";

export default function App() {

    const { authState, login, logout } = useContext(AuthContext);

    return (
        <div className="font-sans antialiased relative min-h-screen w-full flex flex-col gap-12 items-center justify-center bg-[#0a0a0a] overflow-hidden">
            
            {/* The Soft Aurora Background */}
            <div className="absolute inset-0 z-0">
                <SoftAurora 
                    speed={1.0}
                    scale={1.5}
                    brightness={1}
                    color1="#f7f7f7"
                    color2="#e100ff"
                    noiseFrequency={2.5}
                    noiseAmplitude={1}
                    bandHeight={0.5}
                    bandSpread={1}
                    octaveDecay={0.1}
                    layerOffset={0}
                    colorSpeed={1}
                    enableMouseInteraction
                    mouseInfluence={0.25}
                />
            </div>

            {/* THE TYPING TEXT EFFECT */}
            <div className="relative w-full flex justify-center z-10 pointer-events-none px-4">
                {/* longer sentences stay centered */}
                <div className="text-3xl md:text-4xl text-white font-bold tracking-widest text-center">
                    <TextType 
                        text={[
                            "Welcome to URLambda", 
                            "Shorten your links in seconds", 
                            "Share with the world!"
                        ]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="_"
                        deletingSpeed={50}
                        variableSpeedEnabled={false}
                        variableSpeedMin={60}
                        variableSpeedMax={120}
                        cursorBlinkDuration={0.5}
                    />
                </div>
            </div>

            {/* AUTH SECTION */}
            <div className="relative z-10">

                {!authState?.token?(

                    <GoogleLogin

                        onSuccess={async (credentialResponse) => {

                            try{

                                const response = await fetch(
                                    `${import.meta.env.VITE_API_URL}/auth/google`,
                                    {
                                        method: 'POST',

                                        headers: {
                                            'Content-Type': 'application/json'
                                        },

                                        body: JSON.stringify({
                                            googleToken: credentialResponse.credential
                                        })
                                    }
                                );

                                const data = await response.json();
                                login(data.token, data.user);

                            } catch(err){

                                console.log(err);

                            }

                        }}

                        onError={() => {
                            console.log('Login Failed');
                    }}
                    />
                ) : (
                    
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-white text-lg font-semibold">
                            Welcome, {authState?.user?.name}
                        </p>
                        <button
                            onClick={() =>
                                window.open('/dashboard', '_blank')
                            }
                            className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:scale-105 transition"
                            >
                                Go to Dashboard
                            </button>
                        <button
                            onClick={logout}
                            className="px-6 py-2 rounded-lg bg-white text-black font-semibold hover:scale-105 transition"
                        >
                            Logout
                        </button>
                    </div>
                    
                )}
            </div>

            

            {/* Your Form (Floating above the aurora) */}
            <div className="relative z-10 animate-levitate w-full max-w-md">
                <Form />
            </div>

        </div>
    );
}