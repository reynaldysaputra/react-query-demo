import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

function fetchSuperHeroes(params) {
  return axios.get('http://localhost:4000/superheroes');
}

function fetchFriends(params) {
  return axios.get('http://localhost:4000/friends');
}

function ParallelQuery(props){
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);

  return(
    <div>
      Parallel Queries Page
    </div>
  )
}

export default ParallelQuery;