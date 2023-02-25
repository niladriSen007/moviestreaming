import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import { useFetch } from "../../../hooks/useFetch";



const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        <Carousel
            title="Recommendations"
            trendingMovies={data?.results}
            loading={loading}
            queryTab={mediaType}
        />
    );
};

export default Recommendation;