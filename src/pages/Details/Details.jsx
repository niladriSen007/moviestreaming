import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Img from "../../components/lazyLoadingImage/Img";
import { useFetch } from "../../hooks/useFetch";
import Recommendation from "./carousels/Recommendation";
import Similar from "./carousels/Similar";
import Cast from "./cast/Cast";
import "./Details.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import VideosSection from "./videoSection/VideoSection";

const Details = () => {
  const { url } = useSelector((state) => state.movie);

  const loc = useLocation();
  const mediaType = loc.pathname.split("/")[1];
  const movieId = loc.pathname.split("/")[2];

  const { data, loading } = useFetch(`/${mediaType}/${movieId}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${movieId}/credits`
  );
  // console.log(movie?.data?.backdrop_path)

  // console.log(mediaType,movieId)
  const imageUrl = url.poster + data?.backdrop_path;
  return (
    <div>
      {/* <Img  src={imageUrl}/> */}
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={movieId} />
      <Recommendation mediaType={mediaType} id={movieId} />
    </div>
  );
};

export default Details;
