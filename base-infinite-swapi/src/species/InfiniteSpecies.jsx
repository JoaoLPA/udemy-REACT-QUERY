import './species.css';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import ErrorDisplay from '../common/Error/main';
import LoadingDisplay from '../common/Loading/main';
import { Species } from './Species';
import swUrl from '../imgs/sw.svg';

const initialUrl = 'https://swapi.py4e.com/api/species/';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sw-species'],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  function getMoreData() {
    if (!isFetching) {
      fetchNextPage();
    }
  }

  if (isError) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <>
      <LoadingDisplay isFetching={isFetching} isLoading={isLoading} />
      <InfiniteScroll loadMore={getMoreData} hasMore={hasNextPage}>
        {data?.pages?.map((pageData) => {
          return pageData.results.map((specie) => (
            <Species
              key={specie.name}
              name={specie.name}
              language={specie.language}
              averageLifespan={specie.average_lifespan}
            />
          ));
        })}
      </InfiniteScroll>
      {data && !hasNextPage && <img src={swUrl} className='speciesEnd' />}
    </>
  );
}
