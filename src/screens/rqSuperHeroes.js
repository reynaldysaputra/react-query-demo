import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAddSuperHeroesData, useSuperHeroesData } from "../hooks/useSuperHeroesData";

function RqSuperHeroes(params) {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState(''); 
  const {mutate, error: mutateMessageError, isError: mutateError} = useAddSuperHeroesData();
  const { data: result, isLoading, isError, error, refetch, isFetching } = useSuperHeroesData();

  const handleAddHero = (e) => {
    e.preventDefault();
    const hero = {name, alterEgo};
    mutate(hero);
  }

  if(isLoading) return <h2>Loading...</h2>;

  if(isError) return <h2>{error.message}</h2>

  return(
    <>
      <h2>RQ Super page</h2>
      <form onSubmit={handleAddHero}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)}/>
        {mutateError && mutateMessageError}
        {console.log(mutateMessageError)}
        <button type="submit">Add Hero</button>
      </form>
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