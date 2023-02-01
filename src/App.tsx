import { useQuery } from 'react-query';
import './App.css';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchContributors = async () => {
  await wait(1_000);

  const response = await fetch(
    "https://api.github.com/repos/tannerlinsley/react-query/contributors"
  );

  return await response.json();
};

export const App = () => {
  const { isLoading, status, error, data } = useQuery("contributors", fetchContributors);

  const contributors = !data ? undefined : data as any[];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (status === "error") {
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
  )
};
