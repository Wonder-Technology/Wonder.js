type t =
  | Metalness(float);

let create = value => Metalness(value);

let value = metalness =>
  switch (metalness) {
  | Metalness(value) => value
  };
