type t =
  | Near(SceneGraphType.near);

let create = value => Near(value);

let value = near =>
  switch (near) {
  | Near(value) => value
  };
