import {
    useContext,
    useEffect,
    useState
} from "react";

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
                bg-white/5
                border border-white/10
                backdrop-blur-md
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
                    Dashboard
                </h1>

                <p className="
                    text-xl
                    text-gray-300
                    text-center
                    mb-10
                ">
                    Welcome, {authState?.user?.name}
                </p>

                <div className="
                    flex
                    flex-col
                    gap-6
                ">

                    {
                        urls.length === 0 ? (

                            <p className="
                                text-center
                                text-gray-400
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
                                        text-sm
                                        text-gray-400
                                        mb-2
                                    ">
                                        Long URL
                                    </p>

                                    <p className="
                                        break-all
                                        mb-5
                                    ">
                                        {url.longUrl}
                                    </p>

                                    <p className="
                                        text-sm
                                        text-gray-400
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
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-purple-600
                                                hover:bg-purple-700
                                                transition
                                            "
                                        >
                                            Open
                                        </a>

                                        <button
                                            onClick={() =>
                                                handleDelete(url._id)
                                            }
                                            className="
                                                px-4
                                                py-2
                                                rounded-lg
                                                bg-red-500/80
                                                hover:bg-red-500
                                                transition
                                            "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))

                        )
                    }

                </div>

            </div>

        </div>

    );

}