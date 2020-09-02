type t =
  | PerspectiveMatrix(Js.Typed_array.Float32Array.t);

let create = value => PerspectiveMatrix(value);

let value = mat =>
  switch (mat) {
  | PerspectiveMatrix(value) => value
  };
