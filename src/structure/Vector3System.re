open Vector3Type;

open Js.Typed_array;

/* let transformMat4 = ((x, y, z), mat4: Js.Array.t(float)) => {
     let w =
       ref(
         WonderCommonlib.ArraySystem.unsafeGet(mat4, 3)
         *. x
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 7)
         *. y
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 11)
         *. z
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 15)
       );
     w :=
       (
         switch w^ {
         | 0. => 1.0
         | d => d
         }
       );
     (
       (
         WonderCommonlib.ArraySystem.unsafeGet(mat4, 0)
         *. x
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 4)
         *. y
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 8)
         *. z
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 12)
       )
       /. w^,
       (
         WonderCommonlib.ArraySystem.unsafeGet(mat4, 1)
         *. x
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 5)
         *. y
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 9)
         *. z
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 13)
       )
       /. w^,
       (
         WonderCommonlib.ArraySystem.unsafeGet(mat4, 2)
         *. x
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 6)
         *. y
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 10)
         *. z
         +. WonderCommonlib.ArraySystem.unsafeGet(mat4, 14)
       )
       /. w^
     )
   }; */
let _transformMat4ToTuple = (x, y, z, mat4) => {
  let w =
    ref(
      Float32Array.unsafe_get(mat4, 3)
      *. x
      +. Float32Array.unsafe_get(mat4, 7)
      *. y
      +. Float32Array.unsafe_get(mat4, 11)
      *. z
      +. Float32Array.unsafe_get(mat4, 15)
    );
  w :=
    (
      switch w^ {
      | 0. => 1.0
      | d => d
      }
    );
  (
    (
      Float32Array.unsafe_get(mat4, 0)
      *. x
      +. Float32Array.unsafe_get(mat4, 4)
      *. y
      +. Float32Array.unsafe_get(mat4, 8)
      *. z
      +. Float32Array.unsafe_get(mat4, 12)
    )
    /. w^,
    (
      Float32Array.unsafe_get(mat4, 1)
      *. x
      +. Float32Array.unsafe_get(mat4, 5)
      *. y
      +. Float32Array.unsafe_get(mat4, 9)
      *. z
      +. Float32Array.unsafe_get(mat4, 13)
    )
    /. w^,
    (
      Float32Array.unsafe_get(mat4, 2)
      *. x
      +. Float32Array.unsafe_get(mat4, 6)
      *. y
      +. Float32Array.unsafe_get(mat4, 10)
      *. z
      +. Float32Array.unsafe_get(mat4, 14)
    )
    /. w^
  )
};

let _transformMat4ToTypeArray = (x, y, z, mat4, resultFloat32Arr) => {
  let w =
    ref(
      Float32Array.unsafe_get(mat4, 3)
      *. x
      +. Float32Array.unsafe_get(mat4, 7)
      *. y
      +. Float32Array.unsafe_get(mat4, 11)
      *. z
      +. Float32Array.unsafe_get(mat4, 15)
    );
  w :=
    (
      switch w^ {
      | 0. => 1.0
      | d => d
      }
    );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    0,
    (
      Float32Array.unsafe_get(mat4, 0)
      *. x
      +. Float32Array.unsafe_get(mat4, 4)
      *. y
      +. Float32Array.unsafe_get(mat4, 8)
      *. z
      +. Float32Array.unsafe_get(mat4, 12)
    )
    /. w^
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    0,
    (
      Float32Array.unsafe_get(mat4, 1)
      *. x
      +. Float32Array.unsafe_get(mat4, 5)
      *. y
      +. Float32Array.unsafe_get(mat4, 9)
      *. z
      +. Float32Array.unsafe_get(mat4, 13)
    )
    /. w^
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    0,
    (
      Float32Array.unsafe_get(mat4, 2)
      *. x
      +. Float32Array.unsafe_get(mat4, 6)
      *. y
      +. Float32Array.unsafe_get(mat4, 10)
      *. z
      +. Float32Array.unsafe_get(mat4, 14)
    )
    /. w^
  );
  resultFloat32Arr
};

let transformMat4Tuple = ((x, y, z), mat4: Float32Array.t) => _transformMat4ToTuple(x, y, z, mat4);

let transformMat4TypeArray = (vec3TypeArray, mat4: Float32Array.t, resultFloat32Arr) => {
  let x = Float32Array.unsafe_get(vec3TypeArray, 0);
  let y = Float32Array.unsafe_get(vec3TypeArray, 1);
  let z = Float32Array.unsafe_get(vec3TypeArray, 2);
  _transformMat4ToTypeArray(x, y, z, mat4, resultFloat32Arr)
};

let add = (type g, kind: number(g), (x1, y1, z1), (x2, y2, z2)) =>
  switch kind {
  | Float => (x1 +. x2, y1 +. y2, z1 +. z2)
  };

let sub = (type g, kind: number(g), (x1, y1, z1), (x2, y2, z2)) =>
  switch kind {
  | Float => (x1 -. x2, y1 -. y2, z1 -. z2)
  };

let lerp = ((x1, y1, z1), (x2, y2, z2), t: float) => (
  x1 +. t *. (x2 -. x1),
  y1 +. t *. (y2 -. y1),
  z1 +. t *. (z2 -. z1)
);