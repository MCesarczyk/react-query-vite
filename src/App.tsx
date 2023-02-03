import { useQuery } from 'react-query';
import './App.css';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchContributors = async ({ queryKey }: any) => {
  await wait(1_000);
  const [, { per_page }] = queryKey;

  const params = new URLSearchParams({
    per_page,
  });

  const response = await fetch(
    `https://api.github.com/repos/tannerlinsley/react-query/contributorsz?${params}`
  );
  
  if(!response.ok){
    throw new Error("Failed to load data...");
  }

  return await response.json();
};

const perPage = 5;

export const App = () => {
  const { isLoading, error, data } = useQuery(
    ["contributors", { per_page: perPage }],
    fetchContributors,
    {
      staleTime: 5_000,
    }
  );

  const contributors: any[] = data || [];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{`Error: ${(error as Error).message}`}</h1>;
  }

  return (
    <>
      <h1>React Query contributors</h1>
      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Commitment</th>
          </tr>
        </thead>
        <tbody>
          {contributors?.map(contributor => (
            <tr key={contributor.id}>
              <td>{contributor.login}</td>
              <td>{contributor.contributions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};