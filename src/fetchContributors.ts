const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchContributors = async ({ queryKey }: any) => {
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
