type t =
  | Aspect(SceneGraphRepoType.aspect);

let create = value => Aspect(value);

let value = aspect =>
  switch (aspect) {
  | Aspect(value) => value
  };
