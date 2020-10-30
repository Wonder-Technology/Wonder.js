type t =
  | GameObject(SceneGraphRepoType.gameObject);

let create = value => GameObject(value);

let value = gameObject =>
  switch (gameObject) {
  | GameObject(value) => value
  };
