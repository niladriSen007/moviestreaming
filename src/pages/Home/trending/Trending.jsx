import React, { useEffect, useState } from 'react'
import Carousel from '../../../components/carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import { useFetch } from '../../../hooks/useFetch'


const Trending = () => {

  const [queryTab,setQueryTab] = useState("day")
  const [trendingMovies,setTrendingMovies] = useState([])

      const onTabChange = (tab) =>{
            // const res = useFetch(`/all/${tab}`)
            setQueryTab(tab.toLowerCase())
            // console.log(tab.toLowerCase())
      }


        const {data,loading} = useFetch(`/trending/all/${queryTab}`)
        console.log(data?.results)

        useEffect(()=>{
          setTrendingMovies(data?.results)
        },[queryTab])


  return (
    <div className='carouselSection'>
            <ContentWrapper>
                        <span className="carouselTitle">Trending</span>
                        <SwitchTabs  data={["Day","Week"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel  trendingMovies={trendingMovies} loading={loading}/>
    </div>
  )
}

export default Trending