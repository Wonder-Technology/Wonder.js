type t = EmissionColor(Color3VO.t)

let create = value => EmissionColor(value)

let value = color =>
  switch color {
  | EmissionColor(value) => value
  }

let getPrimitiveValue = color => color->value->Color3VO.value
