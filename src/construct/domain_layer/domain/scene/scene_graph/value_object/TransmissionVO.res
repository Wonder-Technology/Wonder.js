type t = Transmission(float)

let create = value => Transmission(value)

let value = transmission =>
  switch transmission {
  | Transmission(value) => value
  }
