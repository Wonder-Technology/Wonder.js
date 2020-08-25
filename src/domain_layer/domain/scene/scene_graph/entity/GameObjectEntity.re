type t =
  | GameObject(GameObjectPOType.uid);

let create = uid => GameObject(uid);

let value = gameObject =>
  switch (gameObject) {
  | GameObject(uid) => uid
  };
