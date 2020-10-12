type t =
  | SpecularColor(Color3VO.t);

let create = value => SpecularColor(value);

let value = color =>
  switch (color) {
  | SpecularColor(value) => value
  };

let getPrimitiveValue = color => color->value->Color3VO.value;
