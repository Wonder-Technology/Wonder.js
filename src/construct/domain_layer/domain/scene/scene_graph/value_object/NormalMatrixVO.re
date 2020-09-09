type t =
  | NormalMatrix(TransformPOType.normalMatrix);

let create = value => NormalMatrix(value);

let value = mat =>
  switch (mat) {
  | NormalMatrix(value) => value
  };
