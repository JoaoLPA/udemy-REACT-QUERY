import './App.css';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { InfinitePeople } from './people/InfinitePeople';
import { InfiniteSpecies } from './species/InfiniteSpecies';

function App() {
  const queryClient = new QueryClient();

  const [option, setOption] = useState('people');

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <h1>Infinite SWAPI</h1>
        <fieldset>
          <div>
            <input
              type='checkbox'
              name='people'
              checked={option === 'people'}
              onChange={() => setOption('people')}
            />
            <label>People</label>
          </div>
          <div>
            <input
              type='checkbox'
              name='species'
              checked={option === 'species'}
              onChange={() => setOption('species')}
            />
            <label>Species</label>
          </div>
        </fieldset>

        {option === 'people' ? <InfinitePeople /> : <InfiniteSpecies />}
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
