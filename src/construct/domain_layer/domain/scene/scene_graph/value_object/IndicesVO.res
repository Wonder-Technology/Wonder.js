open Js.Typed_array

type t = Indices(Uint32Array.t)

let create = value => Indices(value)

let value = indices =>
  switch indices {
  | Indices(value) => value
  }

let getCount = indices => indices->value->Uint32Array.length
