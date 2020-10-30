type t =
  | Near(SceneGraphRepoType.near);

let create = value => Near(value);

let value = near =>
  switch (near) {
  | Near(value) => value
  };
