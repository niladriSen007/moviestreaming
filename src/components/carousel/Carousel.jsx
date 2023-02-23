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

const Carousel = ({trendingMovies,loading}) => {

      const carouselContainer = useRef()
      // console.log(carouselContainer.current)

      const {url} = useSelector(state=>state.movie)
      const navigateTo = useNavigate()

      const navigation = (direction) =>{

      }

  return (
    <div className="carousel">
      <ContentWrapper>
            <BsFillArrowLeftCircleFill  className="carouselLeftNav arrow" onClick={()=>navigation("left")}/>
            <BsFillArrowRightCircleFill  className="carouselRightNav arrow" onClick={()=>navigation("right")}/>
            {
                  loading ? 
                  (
                        <span>Loading...</span>
                  )
                  :
                  <div className="carouselItems">
                        {
                              trendingMovies?.map(item=>{
                                    const posterImgUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                    return(
                                          <div className="carouselItem" key={item.id}>
                                                <div className="posterBlock">
                                                      <Img src={posterImgUrl}/>
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