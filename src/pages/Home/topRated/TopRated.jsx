import React, { useEffect, useState } from 'react'
import Carousel from '../../../components/carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import { useFetch } from '../../../hooks/useFetch'


const TopRated = () => {

  const [queryTab,setQueryTab] = useState("movie")

      const onTabChange = (tab) =>{
            // const res = useFetch(`/all/${tab}`)
            setQueryTab(tab.toLowerCase())
            // console.log(tab.toLowerCase())
      }


        const {data,loading} = useFetch(`/${queryTab}/top_rated`)
        
        console.log(data?.results)
        
        // useEffect(()=>{
        //   const {data,loading} = useFetch(`/trending/all/${queryTab}`)
        //   setTrendingMovies(data?.results)
        // },[])

        // useEffect(()=>{
        //   setTrendingMovies(data?.results)
        // },[queryTab])


  return (
    <div className='carouselSection'>
            <ContentWrapper>
                        <span className="carouselTitle">Top Rated</span>
                        <SwitchTabs  data={["Movie","Tv"]} onTabChange={onTabChange}/>
            </ContentWrapper>
            <Carousel  queryTab={queryTab} trendingMovies={data?.results} loading={loading}/>
    </div>
  )
}

export default TopRated