import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useSWRP = (url: string) => useSWR(url, fetcher);

export default useSWRP;
