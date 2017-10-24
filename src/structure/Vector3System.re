open Vector3Type;

let transformMat4
    (x, y, z)
    (
      /* m00, m01,m02,m03,m10,m11,m12,m13,m20,m21,m22,m23,m30,m31,m32,m33 */
      m0,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      m9,
      m10,
      m11,
      m12,
      m13,
      m14,
      m15
    )
    (out: ArraySystem.t float) => {
  let w = ref (m3 *. x +. m7 *. y +. m11 *. z +. m15);
  /* w := !w || 1.0; */
  w :=
    (
      switch !w {
      | 0. => 1.0
      | d => d
      }
    );
  ArraySystem.unsafeSet out 0 ((m0 *. x +. m4 *. y +. m8 *. z +. m12) /. !w);
  ArraySystem.unsafeSet out 1 ((m1 *. x +. m5 *. y +. m9 *. z +. m13) /. !w);
  ArraySystem.unsafeSet out 2 ((m2 *. x +. m6 *. y +. m10 *. z +. m14) /. !w);
  out
};

let add (type g) (kind: number g) (x1, y1, z1) (x2, y2, z2) =>
  switch kind {
  | Float =>
    /* ArraySystem.unsafeSet out 0 (x1 +. x2);
       ArraySystem.unsafeSet out 1 (y1 +. y2);
       ArraySystem.unsafeSet out 2 (z1 +. z2);
       out */
    (x1 +. x2, y1 +. y2, z1 +. z2)
  };
