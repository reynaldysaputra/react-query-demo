import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

function fetchSuperHeroes(params) {
  return axios.get('http://localhost:4000/superheroes');
}

function addSuperHero(hero) {
  return axios.post('http://localhost:4000/superheroes', hero);
}

export function useSuperHeroesData(props) {
  return useQuery(
    ['super-heroes'], 
    fetchSuperHeroes,
    {
      cacheTime: 5000, // cache di set 5 detik, jadi jika query tidak aktif selama 5 detik dan ketika query aktif, maka dia akan refetch ulang
      staleTime: 0, // data basi, gunakan staleTime untuk mengatur data basi agar tidak merefetch ulang
      // refetchInterval: 2000, // fetch data setiap 2 detik sekali, ini berguna untuk mendapatkan data secara langsung
      // refetchIntervalInBackground: true, // fetch 2 detik sekali ketika memindahkan browser
      // enabled: false, // artinya jangan fetch data sebelum ada tindakan dari client, misalnya klik tombol
      onSuccess: (data) => console.log(`Perfom side effect after data fetching`, data),
      onError: (error) => console.log(`Perfom side effect after encountering error`, error),
      // select: data => {
      //   const superHeroName = data.data.map(hero => hero.name);
      //   return superHeroName;
      // }
    }
  );
}

export function useAddSuperHeroesData(){
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    onMutate: async ({ data }) => {
      const previousHeroData = queryClient.getQueriesData('super-heroes');
      
      await queryClient.cancelQueries('super-heroes');

      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, {
            id: oldQueryData.data?.length + 1,
            ...data
          }]
        }
      })

      return {
        previousHeroData
      }
    },

    onError: (error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },

    onSuccess: (data, error) => {
      queryClient.invalidateQueries('super-heroes');
    }
  });
}