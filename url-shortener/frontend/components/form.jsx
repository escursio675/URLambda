import { useState } from "react"

export default function Form(){

    const [inputURL, setinputURL] = useState("");
    const [outputURL, setoutputURL] = useState("");

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

            </form>
        </div>
    )
}