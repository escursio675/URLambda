import { useState } from "react"

export default function Form(){

    const [inputURL, setinputURL] = useState("");
    const [outputURL, setoutputURL] = useState("");
    const [qrCode, setQrCode] = useState("");

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
        <div>
            <form onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center">

                <h2>Submit your URL</h2>

                <input type="text" placeholder="https://exampleurl.com"
                value={inputURL}
                onChange={(e) => setinputURL(e.target.value)}
                className="border border-black w-lg"></input>

                <button type="submit"
                className="bg-[#547792] border border-white rounded-lg w-full">
                    Generate URL
                </button>

                <input type="text" placeholder="https://generatedurl.com"
                readOnly
                value={outputURL}
                className="border border-black w-lg"></input>

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