import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadingImage/Img";
import { useFetch } from "../../../hooks/useFetch";
import "./HeroBanner.scss";

const HeroBanner = () => {
  const [heroImg, setHeroImg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigateTo = useNavigate();
  // console.log(searchQuery)

  const { data, loading } = useFetch("/movie/upcoming");

  const img = useSelector((state) => state.movie.url.backdrop);

  useEffect(() => {
    const bg =
      img + data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setHeroImg(bg);
  }, [data]);

  const handleSearchQuery = (e) => {
    if (searchQuery.length > 0 && e.key === "Enter") {
      navigateTo(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={heroImg} />
        </div>
      )}

      <div className="opacity-layer">
      </div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, T shows and people to discover
          </span>
          <div className="searchInput">
            <input
              type="text"
              name=""
              placeholder="Search for a movie or Tv show"
              id=""
              onKeyUp={handleSearchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
