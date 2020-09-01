type t =
  | Diffuse(Color3VO.t);

let create = value => Diffuse(value);

let value = diffuse =>
  switch (diffuse) {
  | Diffuse(value) => value
  };

let getPrimitiveValue = diffuse => diffuse->value->Color3VO.value;
