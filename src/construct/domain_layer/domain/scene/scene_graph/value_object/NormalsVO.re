open Js.Typed_array;

type t =
  | Normals(Float32Array.t);

let create = value => Normals(value);

let value = normals =>
  switch (normals) {
  | Normals(value) => value
  };
