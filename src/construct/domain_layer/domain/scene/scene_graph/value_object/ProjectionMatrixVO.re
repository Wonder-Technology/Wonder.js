type t =
  | ProjectionMatrix(SceneGraphRepoType.projectionMatrix);

let create = value => ProjectionMatrix(value);

let value = mat =>
  switch (mat) {
  | ProjectionMatrix(value) => value
  };
