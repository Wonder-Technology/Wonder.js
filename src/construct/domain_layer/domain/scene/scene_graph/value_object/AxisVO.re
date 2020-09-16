type t =
  | Axis((float, float, float));

let create = value => Axis(value);

let value = axis =>
  switch (axis) {
  | Axis(value) => value
  };
