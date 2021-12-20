import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController()

    fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) {
          throw Error('Could not fetch the data for blogs resource.');
        };
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(err.message);
          setError(err.message);
          setIsLoading(false);
          setData(null);
        }
      })

    return () => abortCont.abort() //cleaner function, also used for removing event listeners
  }, [url])

  return { data, isLoading, error }
}

export default useFetch;