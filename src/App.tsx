import './App.css'
import { useQuery } from 'react-query'

const fetchContributors = async () => {
  const response = await fetch(
    "https://api.github.com/repos/tannerlinsley/react-query/contributors"
  );
  return await response.json();
};

function App() {
  const { status, error, data } = useQuery("contributors", fetchContributors);

  const contributors = !data ? undefined : data as any[];

  if (status === "loading") {
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
}

export default App
