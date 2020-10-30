type t =
  | ProjectionMatrix(SceneGraphType.projectionMatrix);

let create = value => ProjectionMatrix(value);

let value = mat =>
  switch (mat) {
  | ProjectionMatrix(value) => value
  };
