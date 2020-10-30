type t =
  | Fovy(SceneGraphType.fovy);

let create = value => Fovy(value);

let value = fovy =>
  switch (fovy) {
  | Fovy(value) => value
  };