import errorUrl from '../../imgs/darth_vader.svg';

export default function ErrorDisplay({ error }) {
  console.log(error);
  return (
    <>
      <p>This it's not the data you're looking for.</p>
      <p>
        Error: <em>{error?.message}</em>
      </p>
      <img src={errorUrl} />
    </>
  );
}
