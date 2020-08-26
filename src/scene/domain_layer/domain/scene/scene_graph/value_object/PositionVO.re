type t =
  | Position(TransformPOType.position);

let create = value => Position(value);

let value = position =>
  switch (position) {
  | Position(value) => value
  };