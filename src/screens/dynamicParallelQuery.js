import axios from 'axios';
import { useQueries } from 'react-query';

function fetchSuperHeroes(heroIds){
  return axios.get(`http://localhost:4000/superheroes/${heroIds}`);
}

function DynamicParallelQuery({ heroIds }) {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return{
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHeroes(id)
      }
    })
  )

  console.log({queryResults})

  return(
    <div>
      Dynamic Parallel Query
    </div>
  )
}

export default DynamicParallelQuery;