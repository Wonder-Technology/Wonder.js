type t =
  | ViewMatrix(SceneGraphType.viewWorldToCameraMatrix);

let create = value => ViewMatrix(value);

let value = mat =>
  switch (mat) {
  | ViewMatrix(value) => value
  };
