type t =
  | Diffuse(Color4VO.t);

let create = value => Diffuse(value);

let value = color =>
  switch (color) {
  | Diffuse(value) => value
  };

let getPrimitiveValue = color => color->value->Color4VO.value;
