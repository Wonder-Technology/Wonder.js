type t =
  | ViewMatrix(Js.Typed_array.Float32Array.t);

let create = value => ViewMatrix(value);

let value = mat =>
  switch (mat) {
  | ViewMatrix(value) => value
  };
