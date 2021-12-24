import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import { Link, Routes, Route } from "react-router-dom";
import DependentQuery from "./screens/dependentQuery";
import DynamicParallelQuery from "./screens/dynamicParallelQuery";
import Home from "./screens/home";
import PaginateQuery from "./screens/paginatedQuery";
import ParallelQuery from "./screens/parallelQuery";
import RqSuperHeroes from "./screens/rqSuperHeroes";
import RqSuperHeroesDetail from "./screens/rqSuperHeroesDetail";
import SuperHeroes from "./screens/superHeroes";

const queryClient = new QueryClient();

function App(params) {
  return(
    <QueryClientProvider client={queryClient}>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/super-heroes'>Traditional Super Heroes</Link>
          </li>
          <li>
            <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
          </li>
          <li>
            <Link to='/rq-parallel'>RQ Parallel</Link>
          </li>
          <li>
            <Link to='/rq-dynamic-parallel'>RQ Dynamic Parallel</Link>
          </li>
          <li>
            <Link to='/rq-dependent'>RQ Dependent</Link>
          </li>
          <li>
            <Link to='/rq-paginated'>RQ Paginated</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/rq-super-heroes' element={<RqSuperHeroes/>} />
        <Route path='/super-heroes' element={<SuperHeroes/>} />
        <Route path='/rq-super-heroes/:heroId' element={<RqSuperHeroesDetail/>} />
        <Route path='/rq-parallel' element={<ParallelQuery/>} />
        <Route path='/rq-dynamic-parallel' element={<DynamicParallelQuery heroIds={[1,3]}/>} />
        <Route path='/rq-dependent' element={<DependentQuery email='renalfrontend@gmail.com' />} />
        <Route path='/rq-paginated' element={<PaginateQuery/>} />
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App;