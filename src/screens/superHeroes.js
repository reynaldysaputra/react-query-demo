import React, { useEffect, useState } from "react";
import axios from 'axios';

function SuperHeroes(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then(res => {
      setData(res.data);
      setLoading(false);
    })
  }, [])

  if(loading){
    return <h2>Loading...</h2>
  }

  return(
    <>
      <div>Super page</div>
    
      {data.map(hero => (
        <div key={hero.id}>
          <p>{hero.name}</p>
        </div>
      ))}
    </>

  )
}

export default SuperHeroes;