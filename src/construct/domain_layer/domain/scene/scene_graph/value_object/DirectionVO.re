type t =
  | Direction(SceneGraphRepoType.direction);

let create = value => Direction(value);

let value = direction =>
  switch (direction) {
  | Direction(value) => value
  };
