let rec range a b =>
  if (a > b) {
    []
  } else {
    [a, ...range (succ a) b]
  };
