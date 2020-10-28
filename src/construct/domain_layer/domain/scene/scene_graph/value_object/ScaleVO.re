type t =
  | Scale(SceneGraphType.scale);

let create = value => Scale(value);

let value = scale =>
  switch (scale) {
  | Scale(value) => value
  };
