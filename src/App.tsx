import { useEffect, useState } from 'react';
import { useIsFetching, useQuery, useQueryClient } from 'react-query';
import './App.css';

const perPage = 5;

export const App = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(
      [
        "contributors",
        {
          per_page: perPage,
          page: page + 1,
        }
      ],
      // fetchContributors,
    );
  }, [page, queryClient]);

  const { isLoading, error, data, isPreviousData } = useQuery(
    ["contributors", { per_page: perPage, page }],
    // fetchContributors,
    {
      staleTime: 5_000,
      keepPreviousData: true,
    }
  );

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
          {Array.isArray(data) ? data?.map(contributor => (
            <tr key={contributor.id}>
              <td>{contributor.login}</td>
              <td>{contributor.contributions}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
      <button onClick={() => setPage(page => page + 1)}>Next page</button>
    </>
  );
};