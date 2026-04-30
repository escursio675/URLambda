import Url from "../models/url.model.js";

const generateShortCode = () =>{
    return Math.random().toString(36).substring(2, 8);
    //create a 6-length short string code
};

export const createShortUrl = async (longUrl) =>{
    if(!(longUrl.startsWith('http://') || longUrl.startsWith('https://')))
        throw new Error("Invalid URL!");

    const shortCode = generateShortCode();

    const newUrl = await Url.create(
        {
            shortCode,
            longUrl
        }
    );

    return newUrl;
};

export const getLongUrl = async (shortCode) =>{
    const longUrl = await Url.findOne({shortCode});

    return longUrl;
};