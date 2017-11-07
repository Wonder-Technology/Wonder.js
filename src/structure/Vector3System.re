open Vector3Type;

let transformMat4 = ((x, y, z), mat4: Js.Array.t(float)) => {
  let w =
    ref(
      ArraySystem.unsafeGet(mat4, 3)
      *. x
      +. ArraySystem.unsafeGet(mat4, 7)
      *. y
      +. ArraySystem.unsafeGet(mat4, 11)
      *. z
      +. ArraySystem.unsafeGet(mat4, 15)
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
      ArraySystem.unsafeGet(mat4, 0)
      *. x
      +. ArraySystem.unsafeGet(mat4, 4)
      *. y
      +. ArraySystem.unsafeGet(mat4, 8)
      *. z
      +. ArraySystem.unsafeGet(mat4, 12)
    )
    /. w^,
    (
      ArraySystem.unsafeGet(mat4, 1)
      *. x
      +. ArraySystem.unsafeGet(mat4, 5)
      *. y
      +. ArraySystem.unsafeGet(mat4, 9)
      *. z
      +. ArraySystem.unsafeGet(mat4, 13)
    )
    /. w^,
    (
      ArraySystem.unsafeGet(mat4, 2)
      *. x
      +. ArraySystem.unsafeGet(mat4, 6)
      *. y
      +. ArraySystem.unsafeGet(mat4, 10)
      *. z
      +. ArraySystem.unsafeGet(mat4, 14)
    )
    /. w^
  )
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