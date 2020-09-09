type t =
  | Near(float);

let create = value => Near(value);

let value = near =>
  switch (near) {
  | Near(value) => value
  };