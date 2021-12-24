import React from "react";
import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

function RqSuperHeroes(params) {
  const { data: result, isLoading, isError, error, refetch, isFetching } = useSuperHeroesData();

  if(isLoading) return <h2>Loading...</h2>;

  if(isError) return <h2>{error.message}</h2>

  return(
    <>
      <h2>RQ Super page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {result?.data.map(hero => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      )) }
      {/* {result?.map(heroName => (
        <div key={heroName}>{heroName}</div>
      ))} */}
    </>
  )
}

export default RqSuperHeroes;