type t =
  | DirectionLight(SceneGraphType.directionLight);

let create = value => DirectionLight(value);

let value = directionLight =>
  switch (directionLight) {
  | DirectionLight(value) => value
  };
