open Js.Typed_array

type t = TexCoords(Float32Array.t)

let create = value => TexCoords(value)

let value = texCoords =>
  switch texCoords {
  | TexCoords(value) => value
  }
