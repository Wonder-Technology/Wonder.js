let rec range = (a, b) =>
  switch a {
  | a when a > b => []
  | a => [a, ...range(succ(a), b)]
  };