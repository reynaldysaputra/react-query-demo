import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

function fetchColors(pageNumber) {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

function PaginateQuery() {
  const [pageNumber, setPage] = useState(1);
  const { data, isLoading, isFetching } = useQuery(['colors', pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true // Coba bikin slow internetnya nanti bakal tau perbedaannya
  })

  if(isLoading) return <h2>Loading...</h2>

  return(
    <div>
      {data?.data.map(color => (
        <div key={color.id}>
          <h2>{color.id}. {color.label}</h2>
        </div>
      ))}
      <button
        onClick={() => setPage(page => page - 1)}
        disabled={pageNumber === 1}
      >Prev page</button>
      <button
        onClick={() => setPage(page => page + 1)}
        disabled={pageNumber === 4}
      >Next page</button>

      {isFetching && 'Loading..'}
    </div>
  )
}

export default PaginateQuery;