import axios from 'axios';
import { useQuery } from 'react-query';

function fetchHero(heroId) {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

export function useSuperHeroesDetail(heroId) {
  return useQuery(['super-hero', heroId], () => fetchHero(heroId));
}