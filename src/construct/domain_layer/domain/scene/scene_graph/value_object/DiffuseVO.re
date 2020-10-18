type t =
  | Diffuse(Color3VO.t);

let create = value => Diffuse(value);

let value = color =>
  switch (color) {
  | Diffuse(value) => value
  };

let getPrimitiveValue = color => color->value->Color3VO.value;
