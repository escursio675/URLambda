import { useState } from "react"

export default function Form(){

    const [inputURL, setinputURL] = useState("");
    const [outputURL, setoutputURL] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [copyState, setcopyState] = useState("Copy");

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
            const response = await fetch(
                "http://localhost:5000/api/v1/shorten",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({longUrl: inputURL})
                }
            );

            const data = await response.json();

            if(!response.ok)
                throw new Error(data.error || "Something went wrong");

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


    return(
        /* The white card container with shadow and rounded corners */
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center">

                <h2 className="text-2xl font-semibold text-gray-800 text-center w-full">
                    Submit your URL
                </h2>

                <input 
                    type="text" 
                    placeholder="https://exampleurl.com"
                    value={inputURL}
                    onChange={(e) => setinputURL(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />

                <button 
                    type="submit"
                    className="w-full bg-[#547792] hover:bg-[#436077] text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                    Generate URL
                </button>

                <div className="w-full flex gap-2">
                    <input 
                    type="text" 
                    placeholder="https://generatedurl.com"
                    readOnly
                    value={outputURL}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none cursor-not-allowed"
                    />
                    <button type="button"
                    onClick={handleCopy}
                    className="border border-gray-300 rounded-lg p-3 w-22 text-center text-sm font-semibold text-[#547792]">
                        {copyState}
                    </button>
                </div>

                <button type="button" onClick={handleGenerateQR} disabled={!outputURL}
                className="bg-green-500 text-white rounded-lg w-full"
                >
                    Generate QR Code
                </button>

                {qrCode && <img src={qrCode} alt="QR Code" className="w-40 h-40" />}

            </form>
        </div>
    )
}