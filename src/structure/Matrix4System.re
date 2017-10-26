open Js.Typed_array;

let fromTranslation (translationTypeArr: Float32Array.t) (index: int) => [|
  1.,
  0.,
  0.,
  0.,
  0.,
  1.,
  0.,
  0.,
  0.,
  0.,
  1.,
  0.,
  Float32Array.unsafe_get translationTypeArr index,
  Float32Array.unsafe_get translationTypeArr (index + 1),
  Float32Array.unsafe_get translationTypeArr (index + 2),
  1.
|];

let multiply
    (aMatTypeArr: Float32Array.t)
    (aMatIndex: int)
    (bMatArr: ArraySystem.t float)
    (bMatIndex: int) => {
  let a00 = Float32Array.unsafe_get aMatTypeArr aMatIndex;
  let a01 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 1);
  let a02 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 2);
  let a03 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 3);
  let a10 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 4);
  let a11 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 5);
  let a12 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 6);
  let a13 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 7);
  let a20 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 8);
  let a21 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 9);
  let a22 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 10);
  let a23 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 11);
  let a30 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 12);
  let a31 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 13);
  let a32 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 14);
  let a33 = Float32Array.unsafe_get aMatTypeArr (aMatIndex + 15);
  /* Cache only the current line of the second matrix
     let b0 = ref (ArraySystem.unsafeGet bMatArr bMatIndex);
     let b1 = ref (ArraySystem.unsafeGet bMatArr (bMatIndex + 1));
     let b2 = ref (ArraySystem.unsafeGet bMatArr (bMatIndex + 2));
     let b3 = ref (ArraySystem.unsafeGet bMatArr (bMatIndex + 3));
     ArraySystem.unsafeSet out 0 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     ArraySystem.unsafeSet out 1 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     ArraySystem.unsafeSet out 2 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     ArraySystem.unsafeSet out 3 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     b0 := ArraySystem.unsafeGet bMatArr (bMatIndex + 4);
     b1 := ArraySystem.unsafeGet bMatArr (bMatIndex + 5);
     b2 := ArraySystem.unsafeGet bMatArr (bMatIndex + 6);
     b3 := ArraySystem.unsafeGet bMatArr (bMatIndex + 7);
     ArraySystem.unsafeSet out 4 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     ArraySystem.unsafeSet out 5 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     ArraySystem.unsafeSet out 6 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     ArraySystem.unsafeSet out 7 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     b0 := ArraySystem.unsafeGet bMatArr (bMatIndex + 8);
     b1 := ArraySystem.unsafeGet bMatArr (bMatIndex + 9);
     b2 := ArraySystem.unsafeGet bMatArr (bMatIndex + 10);
     b3 := ArraySystem.unsafeGet bMatArr (bMatIndex + 11);
     ArraySystem.unsafeSet out 8 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     ArraySystem.unsafeSet out 9 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     ArraySystem.unsafeSet out 10 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     ArraySystem.unsafeSet out 11 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     b0 := ArraySystem.unsafeGet bMatArr (bMatIndex + 12);
     b1 := ArraySystem.unsafeGet bMatArr (bMatIndex + 13);
     b2 := ArraySystem.unsafeGet bMatArr (bMatIndex + 14);
     b3 := ArraySystem.unsafeGet bMatArr (bMatIndex + 15);
     ArraySystem.unsafeSet out 12 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     ArraySystem.unsafeSet out 13 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     ArraySystem.unsafeSet out 14 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     ArraySystem.unsafeSet out 15 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     out */
  let b00 = ArraySystem.unsafeGet bMatArr bMatIndex;
  let b01 = ArraySystem.unsafeGet bMatArr (bMatIndex + 1);
  let b02 = ArraySystem.unsafeGet bMatArr (bMatIndex + 2);
  let b03 = ArraySystem.unsafeGet bMatArr (bMatIndex + 3);
  let b10 = ArraySystem.unsafeGet bMatArr (bMatIndex + 4);
  let b11 = ArraySystem.unsafeGet bMatArr (bMatIndex + 5);
  let b12 = ArraySystem.unsafeGet bMatArr (bMatIndex + 6);
  let b13 = ArraySystem.unsafeGet bMatArr (bMatIndex + 7);
  let b20 = ArraySystem.unsafeGet bMatArr (bMatIndex + 8);
  let b21 = ArraySystem.unsafeGet bMatArr (bMatIndex + 9);
  let b22 = ArraySystem.unsafeGet bMatArr (bMatIndex + 10);
  let b23 = ArraySystem.unsafeGet bMatArr (bMatIndex + 11);
  let b30 = ArraySystem.unsafeGet bMatArr (bMatIndex + 12);
  let b31 = ArraySystem.unsafeGet bMatArr (bMatIndex + 13);
  let b32 = ArraySystem.unsafeGet bMatArr (bMatIndex + 14);
  let b33 = ArraySystem.unsafeGet bMatArr (bMatIndex + 15);
  [|
    b00 *. a00 +. b01 *. a10 +. b02 *. a20 +. b03 *. a30,
    b00 *. a01 +. b01 *. a11 +. b02 *. a21 +. b03 *. a31,
    b00 *. a02 +. b01 *. a12 +. b02 *. a22 +. b03 *. a32,
    b00 *. a03 +. b01 *. a13 +. b02 *. a23 +. b03 *. a33,
    b10 *. a00 +. b11 *. a10 +. b12 *. a20 +. b13 *. a30,
    b10 *. a01 +. b11 *. a11 +. b12 *. a21 +. b13 *. a31,
    b10 *. a02 +. b11 *. a12 +. b12 *. a22 +. b13 *. a32,
    b10 *. a03 +. b11 *. a13 +. b12 *. a23 +. b13 *. a33,
    b20 *. a00 +. b21 *. a10 +. b22 *. a20 +. b23 *. a30,
    b20 *. a01 +. b21 *. a11 +. b22 *. a21 +. b23 *. a31,
    b20 *. a02 +. b21 *. a12 +. b22 *. a22 +. b23 *. a32,
    b20 *. a03 +. b21 *. a13 +. b22 *. a23 +. b23 *. a33,
    b30 *. a00 +. b31 *. a10 +. b32 *. a20 +. b33 *. a30,
    b30 *. a01 +. b31 *. a11 +. b32 *. a21 +. b33 *. a31,
    b30 *. a02 +. b31 *. a12 +. b32 *. a22 +. b33 *. a32,
    b30 *. a03 +. b31 *. a13 +. b32 *. a23 +. b33 *. a33
  |]
};

let buildPerspective (fovy: float) (aspect: float) (near: float) (far: float) => {
  let f = 1.0 /. (Js.Math.tan fovy /. 2.);
  let nf = 1. /. (near -. far);
  [|
    f /. aspect,
    0.,
    0.,
    0.,
    0.,
    f,
    0.,
    0.,
    0.,
    0.,
    (far +. near) *. nf,
    (-1.),
    0.,
    0.,
    2. *. far *. near *. nf,
    0.
  |]
};