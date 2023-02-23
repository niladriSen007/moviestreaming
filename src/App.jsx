import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PageNotFound from './pages/404/PageNotFound'
import Details from './pages/Details/Details'
import Explore from './pages/Explore/Explore'
import Home from './pages/Home/Home'
import SearchResult from './pages/SearchResult/SearchResult'
import { getApiConfig } from './store/movieSlice'
import { fetchDataFromApi } from './utils/api'

function App() {
  const [count, setCount] = useState(null)
  const dispatch = useDispatch();
  const movies = useSelector(state=>state.movie)


  useEffect(()=>{
    fetchApiConfigration()
      },[])

      
  const fetchApiConfigration = async() =>{
    try
    {
      const res = await fetchDataFromApi("/configuration")
      const url ={
        backdrop:res.images.secure_base_url + "original",
        poster:res.images.secure_base_url + "original",
        profile:res.images.secure_base_url + "original",
      }
      dispatch(getApiConfig(url))
    }
    catch(e)
    {
      console.log(e)
    }
  }



  return (

    <div>
      {/* {
      movies?.map((m,i)=>(
        <div key={i}>{m.title}</div>
      ))} */}
      {/* {movies?.url.total_pages} */}
      <BrowserRouter>
      <Header  />
     
        <Routes>
        <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div style={{height:"1000px" }}></div>
        <Footer  />
      </BrowserRouter>
    </div>
  )
}

export default App
