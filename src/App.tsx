import { useState } from 'react';
import { useIsFetching, useQuery } from 'react-query';
import './App.css';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchContributors = async ({ queryKey }: any) => {
  await wait(1_000);
  const [, { per_page, page }] = queryKey;

  const params = new URLSearchParams({
    per_page,
    page,
  });

  const response = await fetch(
    `https://api.github.com/repos/tannerlinsley/react-query/contributors?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to load data...");
  }

  return await response.json();
};

const perPage = 5;

export const App = () => {
  const [page, setPage] = useState(1);

  const { isLoading, error, data, isPreviousData } = useQuery(
    ["contributors", { per_page: perPage, page }],
    fetchContributors,
    {
      staleTime: 5_000,
      keepPreviousData: true,
    }
  );

  const contributors: any[] = data || [];

  const isFetching = useIsFetching();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{`Error: ${(error as Error).message}`}</h1>;
  }

  return (
    <>
      <h1>React Query contributors</h1>
      <p>{isFetching ? "Fetching..." : "Ready"}</p>
      <p>Page{page}</p>
      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Commitment</th>
          </tr>
        </thead>
        <tbody style={{
          opacity: isPreviousData ? "0.5" : "1",
          transition: "opacity 0.5s"
        }}>
          {contributors?.map(contributor => (
            <tr key={contributor.id}>
              <td>{contributor.login}</td>
              <td>{contributor.contributions}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page => page + 1)}>Next page</button>
    </>
  );
};