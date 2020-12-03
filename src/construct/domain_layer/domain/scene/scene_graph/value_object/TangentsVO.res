open Js.Typed_array

type t = Tangents(Float32Array.t)

let create = value => Tangents(value)

let value = tangents =>
  switch tangents {
  | Tangents(value) => value
  }
