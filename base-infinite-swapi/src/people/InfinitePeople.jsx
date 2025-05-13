import './people.css';
import imgUrl from './imgs/light_saber.svg';
import errorUrl from './imgs/darth_vader.svg';
import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Person } from './Person';

const initialUrl = 'https://swapi.py4e.com/api/people';
const fetchUrl = async (url) => {
  const response = await fetch(url);
  // throw new Error();
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

  if (isError)
    return (
      <>
        <p>Ops, something went wrong. Error: {error.toString()}</p>
        <img src={errorUrl} />
      </>
    );

  return (
    <>
      {isFetching || isLoading ? (
        <img className='light_saber' src={imgUrl} />
      ) : (
        <></>
      )}

      {/* <p className='loading'>Loading</p> */}
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
    </>
  );
}
