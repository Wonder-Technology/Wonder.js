type t = Specular(float)

let create = value => Specular(value)

let value = specular =>
  switch specular {
  | Specular(value) => value
  }
