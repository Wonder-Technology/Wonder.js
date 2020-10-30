type t =
  | DirectionLight(SceneGraphType.directionLight);

let create = index => DirectionLight(index);

let value = directionLight =>
  switch (directionLight) {
  | DirectionLight(index) => index
  };
