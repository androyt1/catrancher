import axios from "axios";

import { useState, useEffect } from "react";

const useCustomDataHook = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://quantcats-bfc2a3b9cfdf.herokuapp.com/bag")
            .then((apiResponse) => {
                const transformedData = apiResponse.data.cats.map((subArray) => {
                    const [stripes, color, shape, eyeColor] = subArray;
                    const id = subArray.join("");
                    const imageUrl = `https://static.quantcast.com/catrancher/${id}.png`; // Fetch the image URL based on your API call

                    return {
                        id,
                        stripes,
                        color,
                        shape,
                        eyeColor,
                        imageUrl,
                    };
                });

                setData(transformedData);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error loading cats", error);
                setLoading(false);
                setError(error);
            });
    }, []);

    return { data, loading, error };
};

export default useCustomDataHook;
