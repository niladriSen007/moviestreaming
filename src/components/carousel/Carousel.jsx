import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
// import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./Carousel.scss"
import Img from "../lazyLoadingImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({trendingMovies,loading,queryTab,title}) => {

      const carouselContainer = useRef()
      // console.log(carouselContainer.current)

      const {url} = useSelector(state=>state.movie)
      const navigateTo = useNavigate()

      const navigation = (direction) =>{
            const container = carouselContainer.current;

            // console.log(container.scrollLeft)

            const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)

            container.scrollTo({
                  left : scrollAmount,
                  behavior : "smooth",
            })
      }

      const skeleton = () =>(
            <div className="skeletonItem">
                  <div className="posterBlock skeleton">
                        <div className="textBlock">
                              <div className="title skeleton"></div>
                              <div className="date skeleton"></div>
                        </div>
                  </div>
            </div>
      )

  return (
    <div className="carousel">
      <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill  className="carouselLeftNav arrow" onClick={()=>navigation("left")}/>
            <BsFillArrowRightCircleFill  className="carouselRightNav arrow" onClick={()=>navigation("right")}/>
            {
                  loading ? 
                  (
                        <div className="loadingSkeleton">
                              {skeleton() }
                              {skeleton() }
                              {skeleton() }
                              {skeleton() }
                        </div>
                  )
                  :
                  <div className="carouselItems" ref={carouselContainer}>
                        {
                              trendingMovies?.map(item=>{
                                    const posterImgUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                    // console.log(item)
                                    return(
                                          <div className="carouselItem" key={item.id} onClick={()=>navigateTo(`/${item.media_type || queryTab}/${item.id}`)}>
                                                <div className="posterBlock">
                                                      <Img src={posterImgUrl}/>
                                                      <CircleRating  rating={item.vote_average.toFixed(1)}/>
                                                      <Genres  ids={item.genre_ids.slice(0,2)} />
                                                </div>
                                                <div className="textBlock">
                                                      <span className="title">{item.title || item.name}</span>
                                                      <span className="date">{dayjs(item.release_Date).format("MMM D,YYYY")}</span>
                                                </div>
                                          </div>
                                    )
                              })
                        }
                  </div>
            }
      </ContentWrapper>
    </div>
  )
}

export default Carousel