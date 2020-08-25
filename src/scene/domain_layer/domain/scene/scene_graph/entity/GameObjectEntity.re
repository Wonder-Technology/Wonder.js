type t =
  | GameObject(ScenePOType.gameObject);

let create = uid => GameObject(uid);

let value = gameObject =>
  switch (gameObject) {
  | GameObject(uid) => uid
  };
