type t =
  | DirectionLight(DirectionLightPOType.directionLight);

let create = index => DirectionLight(index);

let value = directionLight =>
  switch (directionLight) {
  | DirectionLight(index) => index
  };
