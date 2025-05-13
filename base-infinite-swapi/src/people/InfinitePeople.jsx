import './people.css';
import swUrl from '../imgs/sw.svg';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import ErrorDisplay from '../common/Error/main';
import LoadingDisplay from '../common/Loading/main';
import { Person } from './Person';

const initialUrl = 'https://swapi.py4e.com/api/people';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  // throw new Error('Oooops');
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['sw-people'],
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

  if (isError) return <ErrorDisplay error={error} />;

  return (
    <>
      <LoadingDisplay isFetching={isFetching} isLoading={isLoading} />
      <InfiniteScroll loadMore={getMoreData} hasMore={hasNextPage}>
        {data?.pages?.map((pageData) => {
          return pageData.results.map((person) => {
            return (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            );
          });
        })}
      </InfiniteScroll>
      {data && !hasNextPage && <img src={swUrl} className='end' />}
    </>
  );
}
