import React from "react";
import { useSelector } from "react-redux";
import "./Genres.scss"

const Genres = ({ ids }) => {
  const { genres } = useSelector((state) => state.movie);

  return (
    <div className="genres">
      {ids?.map((id) => {
            // console.log(id)
            if(!genres[id]?.name) return;
            return <div className="genre" key={id}>{genres[id]?.name}</div>;
      })}
    </div>
  );
};

export default Genres;
