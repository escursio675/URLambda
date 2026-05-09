import useApi from "../hooks/api/useApi";

import { useState, useEffect } from "react"
import { QrCode } from "lucide-react";

import { useSearchParams } from "react-router-dom";

export default function Form(){

    const [inputURL, setinputURL] = useState("");
    const [outputURL, setoutputURL] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [copyState, setcopyState] = useState("Copy");
    const { request } = useApi();
    const [searchParams] = useSearchParams();

    useEffect(() => {

    const existingUrl =
        searchParams.get('url');

    if(existingUrl){

        setoutputURL(existingUrl);

    }

    }, []);

    const handleCopy = async () =>{
        try{
            await navigator.clipboard.writeText(outputURL);
            setcopyState("Copied!");
            setTimeout(()=> setcopyState("Copy"), 8000);
        }
        catch(err){
            console.log(err);
            setcopyState("Error!");
        }
    }

    const handleSubmit = async (event) =>{
        try{
            event.preventDefault();
            const data = await request(
                "/api/v1/shorten",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({longUrl: inputURL})
                }
            );

            setoutputURL(data.shortUrl);
            
        } catch(err){
            console.log(`Error: ${err.message}`);
            setoutputURL(`Error: ${err.message}`);
        }

    }

    const handleGenerateQR = async () => {
        try {
            if (!outputURL) return; 

            const code = outputURL.split('/').pop();

            const response = await fetch(
                `http://localhost:5000/api/v1/qrcode/${code}`
            );

            const data = await response.json();

            if (!response.ok)
                throw new Error(data.error || "Something went wrong");

            setQrCode(data.qrCode);

        } catch (err) {
            console.log(`Error: ${err.message}`);
            setQrCode(`Error: ${err.message}`);
        }
    }

    // NEW: The Download Function
    const handleDownloadQR = async () => {
        try {
            if (!qrCode) return;
            
            const response = await fetch(qrCode); 
            const blob = await response.blob();
            
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'URLambda-QR.png'; 
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the QR code:", error);
        }
    };

    
    return(
        /* The white card container with shadow and rounded corners */
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100 dark:bg-[#0a0a0a]/80 dark:border-white/10 backdrop-blur-md transition-all duration-500">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">

                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center w-full">
                    Paste your URL below
                </h2>

                <input 
                    type="text" 
                    placeholder="https://exampleurl.com"
                    value={inputURL}
                    onChange={(e) => setinputURL(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 dark:bg-black/50 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />

                <button 
                    type="submit"
                    className="w-full bg-[#547792] hover:bg-[#436077] dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                    Generate URL
                </button>

                <div className="w-full flex gap-2">
                    <input 
                    type="text" 
                    placeholder="https://generatedurl.com"
                    readOnly
                    value={outputURL}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-white/10 rounded-md bg-gray-50 dark:bg-white/5 dark:text-gray-300 focus:outline-none cursor-not-allowed"
                    />
                    <button type="button"
                    onClick={handleCopy}
                    className="border border-gray-300 dark:border-white/20 dark:text-purple-400 dark:hover:bg-white/5 rounded-lg p-3 w-22 text-center text-sm font-semibold text-[#547792] transition-colors">
                        {copyState}
                    </button>
                </div>

                <button type="button" onClick={handleGenerateQR} disabled={!outputURL}
                className="
                    w-full rounded-2xl border border-gray-200 dark:border-white/20 
                    bg-gray-50/70 dark:bg-white/10 backdrop-blur-md
                    px-5 py-3
                    text-[#2b3445] dark:text-white font-medium
                    shadow-sm dark:shadow-none
                    transition-all duration-300
                    hover:bg-gray-100 dark:hover:bg-white/20
                    hover:-translate-y-0.5
                    active:scale-[0.98]
                    flex items-center justify-center gap-2
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
                "
                >
                <QrCode size={18} />
                Generate QR Code
                </button>

                {/* NEW: Conditional block that shows both the image AND the download button */}
                {qrCode && (
                    <div className="flex flex-col items-center gap-3 w-full animate-in fade-in slide-in-from-top-4 duration-500">
                        <img src={qrCode} alt="QR Code" className="w-40 h-40 rounded-lg shadow-sm border border-gray-100 dark:border-white/10" />
                        
                        <button
                            onClick={handleDownloadQR}
                            type="button"
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 dark:border-white/20 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-200 active:scale-[0.98]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download QR Code
                        </button>
                    </div>
                )}

            </form>
        </div>
    )
}