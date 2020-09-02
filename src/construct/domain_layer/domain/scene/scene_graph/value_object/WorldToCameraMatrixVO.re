type t =
  | WorldToCameraMatrix(Js.Typed_array.Float32Array.t);

let create = value => WorldToCameraMatrix(value);

let value = mat =>
  switch (mat) {
  | WorldToCameraMatrix(value) => value
  };
