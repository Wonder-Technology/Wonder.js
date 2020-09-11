open Js.Typed_array;

type t =
  | Vertices(Float32Array.t);

let create = value => Vertices(value);

let value = vertices =>
  switch (vertices) {
  | Vertices(value) => value
  };