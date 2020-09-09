type t =
  | Fovy(float);

let create = value => Fovy(value);

let value = fovy =>
  switch (fovy) {
  | Fovy(value) => value
  };