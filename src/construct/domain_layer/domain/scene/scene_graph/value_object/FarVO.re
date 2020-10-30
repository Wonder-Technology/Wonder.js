type t =
  | Far(SceneGraphType.far);

let create = value => Far(value);

let value = far =>
  switch (far) {
  | Far(value) => value
  };
