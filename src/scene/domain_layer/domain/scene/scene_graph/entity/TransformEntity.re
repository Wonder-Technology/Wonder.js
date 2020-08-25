type t =
  | Transform(ScenePOType.transform);

let create = index => Transform(index);

let value = transform =>
  switch (transform) {
  | Transform(index) => index
  };
