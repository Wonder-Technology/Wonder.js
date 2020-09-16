type t =
  | Scale(TransformPOType.scale);

let create = value => Scale(value);

let value = scale =>
  switch (scale) {
  | Scale(value) => value
  };
