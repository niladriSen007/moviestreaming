import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./SearchResult.scss";

import noResults from "../../assets/no-results.png";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/spinner/Spinner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCart/MovieCard";
const SearchResult = () => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        console.log(res?.results)
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData((prevData) => {
            return {
              ...prevData,
              results: [...prevData?.results, ...res.results],
            };
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1)
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">{`Search ${data?.total_results > 0 ? "results" :"result"} for '${query}'`}</div>
              <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData()}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner  />}
              >
                {
                  data?.results?.map((item,i)=>{
                    if(item.media_type === "person") return;
                    return (
                      <MovieCard key={i} data={item} fromSearch={true}  />
                    )
                  })
                }
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">No results</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
