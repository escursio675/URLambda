import Form from "../components/form";
// 1. Import the new background
import SoftAurora from "../components/SoftAurora";
// 2. Import the new text animation component
import TextType from "../components/TextType";

export default function App() {
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



            {/* Your Form (Floating above the aurora) */}
            <div className="relative z-10 animate-levitate w-full max-w-md">
                <Form />
            </div>

        </div>
    );
}
