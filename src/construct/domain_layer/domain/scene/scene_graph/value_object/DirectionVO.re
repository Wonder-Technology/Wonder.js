type t =
  | Direction((float, float, float));

let create = value => Direction(value);

let value = direction =>
  switch (direction) {
  | Direction(value) => value
  };
