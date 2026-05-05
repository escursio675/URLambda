import Form from "../components/form"

export default function App(){
    return(
        /* Added 'font-sans antialiased' to ensure the pixel font renders perfectly across the whole app */
        <div className="font-sans antialiased relative min-h-screen w-full flex items-center justify-center bg-[#fdfbf7] bg-[radial-gradient(#d6d3ce_1px,transparent_1px)] [background-size:20px_20px] overflow-hidden">
            
            {/* The Glow Mask */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#fdfbf7] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"></div>

            {/* The Form */}
            <div className="relative z-10 animate-levitate w-full max-w-md">
                <Form />
            </div>

        </div>
    )
}