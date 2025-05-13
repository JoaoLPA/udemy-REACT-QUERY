import './loading.css';
import loadingUrl from '../../imgs/light_saber.svg';

export default function LoadingDisplay({ isFetching, isLoading }) {
  if (isFetching || isLoading) {
    return <img className='light_saber' src={loadingUrl} />;
  }

  return <></>;
}
