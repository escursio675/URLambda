import { createShortUrl, getLongUrl, generateQRCode } from "../services/url.service.js";

export const shortenUrl = async (req, res) =>{
    
    try{
        const {longUrl} = req.body;

        if(!longUrl)
            return res.status(400).json({error: "URL is required"});

        const result = await createShortUrl(longUrl);

        const shortUrl = result.shortUrl;

        return res.status(201).json({shortUrl});

    } catch(err){
        console.error(err.message);
        return res.status(500).json({error: err.message});
    }


};

export const redirectUrl = async (req, res) =>{

    try{
        const {code} = req.params;

        const url = await getLongUrl(code);

        if(!url)
            return res.status(404).send("URL not found!");

        return res.redirect(url.longUrl);
    } catch(err){
        console.log({error: err.message});
        return res.status(500).send("Internal server error");
    }

};

export const getQRCode = async (req, res) => {
    try {
        const { code } = req.params;

        const qrCode = await generateQRCode(code);

        return res.status(200).json({ qrCode });

    } catch (err) {
        console.log({error: err.message});
        return res.status(500).send("Internal server error");
    }
};