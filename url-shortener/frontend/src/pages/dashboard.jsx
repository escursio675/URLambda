import {
    useContext,
    useEffect,
    useState
} from "react";

import SoftAurora from "../../components/SoftAurora";

import {
    AuthContext
} from "../../store/auth/authContextProvider";

import useApi from "../../hooks/api/useApi";

export default function Dashboard(){

    const { authState } = useContext(AuthContext);

    const { request } = useApi();

    const [urls, setUrls] = useState([]);

    useEffect(() => {

        const fetchUrls = async () => {

            try {

                const data = await request(
                    '/protected/my-urls',
                    {
                        method: 'GET'
                    }
                );

                setUrls(data.urls);

            } catch(err){

                console.log(err);

            }

        };

        fetchUrls();

    }, []);

    const handleDelete = async (id) => {

        try {

            await request(
                `/protected/my-urls/delete/${id}`,
                {
                    method: 'DELETE'
                }
            );

            setUrls((prev) =>
                prev.filter(
                    (url) => url._id !== id
                )
            );

        } catch(err){

            console.log(err);

        }

    };

    return(

        <div>
            <div className="absolute inset-0 z-0">
                <SoftAurora 
                    speed={2.0}
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
            <div className="
                min-h-screen
                bg-[#0a0a0a]
                text-white
                flex
                items-center
                justify-center
                px-6
                py-12
            ">

                <div className="
                    w-full
                    max-w-3xl
                    bg-black/15
                    border border-white/10
                    backdrop-blur-2xl
                    rounded-2xl
                    p-10
                    shadow-xl
                ">

                    <h1 className="
                        text-4xl
                        font-bold
                        mb-4
                        text-center
                    ">
                        All Links
                    </h1>

                    <div className="
                        flex
                        flex-col
                        gap-6
                    ">

                        {
                            urls.length === 0 ? (

                                <p className="
                                    text-center
                                    text-purple-400
                                ">
                                    No URLs created yet
                                </p>

                            ) : (

                                urls.map((url) => (

                                    <div
                                        key={url._id}
                                        className="
                                            bg-black/30
                                            border border-white/10
                                            rounded-xl
                                            p-5
                                        "
                                    >

                                        <p className="
                                            text-lg
                                            text-gray-200
                                            mb-2
                                        ">
                                            Long URL
                                        </p>

                                        <p className="
                                            break-all
                                            text-xl
                                            mb-5
                                            text-xl
                                        ">
                                            {url.longUrl}
                                        </p>

                                        <p className="
                                            text-lg
                                            text-gray-200
                                            mb-2
                                        ">
                                            Short URL
                                        </p>

                                        <a
                                            href={url.shortUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="
                                                text-purple-400
                                                hover:underline
                                                break-all
                                            "
                                        >
                                            {url.shortUrl}
                                        </a>

                                        <div className="
                                            flex
                                            items-center
                                            gap-3
                                            mt-5
                                        ">

                                            <a
                                                href={`/?url=${encodeURIComponent(url.shortUrl)}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="
                                                    px-6 
                                                    py-2 
                                                    rounded-lg 
                                                    bg-purple-600 
                                                    text-white 
                                                    font-semibold 
                                                    hover:scale-105 
                                                    transition
                                                "
                                            >
                                                Open URL Generation Window
                                            </a>

                                            <button
                                                onClick={() =>
                                                    handleDelete(url._id)
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    border border-gray-300 dark:border-white/20 dark:text-red-400 dark:hover:bg-white/5 rounded-lg text-center text-sm font-semibold text-red-400 transition-colors
                                                "
                                            >
                                                Delete URL Entry
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )
                        }

                    </div>

                </div>

            </div>
        </div>

    );

}