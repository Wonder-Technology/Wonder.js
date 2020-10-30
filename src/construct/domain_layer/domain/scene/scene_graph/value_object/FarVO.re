type t =
  | Far(SceneGraphRepoType.far);

let create = value => Far(value);

let value = far =>
  switch (far) {
  | Far(value) => value
  };
