type t =
  | ProjectionMatrix(Js.Typed_array.Float32Array.t);

let create = value => ProjectionMatrix(value);

let value = mat =>
  switch (mat) {
  | ProjectionMatrix(value) => value
  };
