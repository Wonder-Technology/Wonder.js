type uid = int;

type t =
  | GameObject(uid);

let create = uid => GameObject(uid);

let value = gameObject =>
  switch (gameObject) {
  | GameObject(uid) => uid
  };
