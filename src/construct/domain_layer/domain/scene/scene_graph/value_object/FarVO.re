type t =
  | Far(float);

let create = value => Far(value);

let value = far =>
  switch (far) {
  | Far(value) => value
  };