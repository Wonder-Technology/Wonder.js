type t =
  | Position(SceneGraphType.position);

let create = value => Position(value);

let value = position =>
  switch (position) {
  | Position(value) => value
  };