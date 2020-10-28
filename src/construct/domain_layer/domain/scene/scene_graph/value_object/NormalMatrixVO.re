type t =
  | NormalMatrix(SceneGraphType.normalMatrix);

let create = value => NormalMatrix(value);

let value = mat =>
  switch (mat) {
  | NormalMatrix(value) => value
  };
