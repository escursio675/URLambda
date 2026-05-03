import Url from "../models/url.model.js";
import QRCode from "qrcode";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

const generateShortCode = () =>{
    return Math.random().toString(36).substring(2, 8);
    //create a 6-length short string code
};

export const createShortUrl = async (longUrl) =>{
    if(!(longUrl.startsWith('http://') || longUrl.startsWith('https://')))
        throw new Error("Invalid URL!");

    const shortCode = generateShortCode();

    const shortUrl = `${BASE_URL}/${shortCode}`;

    const newUrl = await Url.create(
        {
            shortCode,
            shortUrl,
            longUrl
        }
    );

    return newUrl;
};

export const getLongUrl = async (shortCode) =>{
    const longUrl = await Url.findOne({shortCode});

    return longUrl;
};

export const generateQRCode = async (shortCode) => {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
        throw new Error("Resource not found!");
    }

    const shortUrl = urlDoc.shortUrl;

    const qrCode = await QRCode.toDataURL(shortUrl);

    return qrCode;
};