type t = Roughness(float)

let create = value => Roughness(value)

let value = roughness =>
  switch roughness {
  | Roughness(value) => value
  }
