type t = Angle(float)

let create = value => Angle(value)

let value = angle =>
  switch angle {
  | Angle(value) => value
  }
