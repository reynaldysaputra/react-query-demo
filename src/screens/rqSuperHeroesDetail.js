import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroesDetail } from '../hooks/useSuperHeroesDetail';

function RqSuperHeroesDetail(props) {
  const { heroId } = useParams();
  const { data: result, isLoading } = useSuperHeroesDetail(heroId);

  if(isLoading) return <h2>Loading...</h2>

  return(
    <div>
      <h1>{result?.data.name} - {result?.data.alterEgo}</h1>
    </div>
  )
}

export default RqSuperHeroesDetail;