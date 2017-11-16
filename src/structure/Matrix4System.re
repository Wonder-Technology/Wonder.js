open Js.Typed_array;

open Contract;

let fromTranslation = (translationTypeArr: Float32Array.t, index: int) => [|
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
  Float32Array.unsafe_get(translationTypeArr, index),
  Float32Array.unsafe_get(translationTypeArr, index + 1),
  Float32Array.unsafe_get(translationTypeArr, index + 2),
  1.
|];

let multiply =
    (aMatTypeArr: Float32Array.t, aMatIndex: int, bMatArr: Js.Array.t(float), bMatIndex: int) => {
  let a00 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex);
  let a01 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 1);
  let a02 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 2);
  let a03 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 3);
  let a10 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 4);
  let a11 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 5);
  let a12 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 6);
  let a13 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 7);
  let a20 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 8);
  let a21 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 9);
  let a22 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 10);
  let a23 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 11);
  let a30 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 12);
  let a31 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 13);
  let a32 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 14);
  let a33 = Float32Array.unsafe_get(aMatTypeArr, aMatIndex + 15);
  /* Cache only the current line of the second matrix
     let b0 = ref (WonderCommonlib.ArraySystem.unsafeGet bMatArr bMatIndex);
     let b1 = ref (WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 1));
     let b2 = ref (WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 2));
     let b3 = ref (WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 3));
     WonderCommonlib.ArraySystem.unsafeSet out 0 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     WonderCommonlib.ArraySystem.unsafeSet out 1 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     WonderCommonlib.ArraySystem.unsafeSet out 2 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     WonderCommonlib.ArraySystem.unsafeSet out 3 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     b0 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 4);
     b1 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 5);
     b2 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 6);
     b3 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 7);
     WonderCommonlib.ArraySystem.unsafeSet out 4 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     WonderCommonlib.ArraySystem.unsafeSet out 5 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     WonderCommonlib.ArraySystem.unsafeSet out 6 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     WonderCommonlib.ArraySystem.unsafeSet out 7 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     b0 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 8);
     b1 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 9);
     b2 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 10);
     b3 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 11);
     WonderCommonlib.ArraySystem.unsafeSet out 8 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     WonderCommonlib.ArraySystem.unsafeSet out 9 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     WonderCommonlib.ArraySystem.unsafeSet out 10 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     WonderCommonlib.ArraySystem.unsafeSet out 11 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     b0 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 12);
     b1 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 13);
     b2 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 14);
     b3 := WonderCommonlib.ArraySystem.unsafeGet bMatArr (bMatIndex + 15);
     WonderCommonlib.ArraySystem.unsafeSet out 12 (!b0 *. a00 +. !b1 *. a10 +. !b2 *. a20 +. !b3 *. a30);
     WonderCommonlib.ArraySystem.unsafeSet out 13 (!b0 *. a01 +. !b1 *. a11 +. !b2 *. a21 +. !b3 *. a31);
     WonderCommonlib.ArraySystem.unsafeSet out 14 (!b0 *. a02 +. !b1 *. a12 +. !b2 *. a22 +. !b3 *. a32);
     WonderCommonlib.ArraySystem.unsafeSet out 15 (!b0 *. a03 +. !b1 *. a13 +. !b2 *. a23 +. !b3 *. a33);
     out */
  let b00 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex);
  let b01 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 1);
  let b02 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 2);
  let b03 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 3);
  let b10 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 4);
  let b11 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 5);
  let b12 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 6);
  let b13 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 7);
  let b20 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 8);
  let b21 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 9);
  let b22 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 10);
  let b23 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 11);
  let b30 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 12);
  let b31 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 13);
  let b32 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 14);
  let b33 = WonderCommonlib.ArraySystem.unsafeGet(bMatArr, bMatIndex + 15);
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

/* let buildPerspective = (fovy: float, aspect: float, near: float, far: float) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "frustum shouldn't be null",
          () => {
            let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
            Js.Math.sin(fovy) <>=. 0.
          }
        )
      )
  );
  let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
  let s = Js.Math.sin(fovy);
  let rd = 1. /. (far -. near);
  let ct = Js.Math.cos(fovy) /. s;
  [|
    ct /. aspect,
    0.,
    0.,
    0.,
    0.,
    ct,
    0.,
    0.,
    0.,
    0.,
    -. (far +. near) *. rd,
    (-1.),
    0.,
    0.,
    (-2.) *. far *. near *. rd,
    0.
  |]
};
/* 
let invert = (mat: Js.Array.t(float)) => {
  let a00 = WonderCommonlib.ArraySystem.unsafeGet(mat, 0);
  let a01 = WonderCommonlib.ArraySystem.unsafeGet(mat, 1);
  let a02 = WonderCommonlib.ArraySystem.unsafeGet(mat, 2);
  let a03 = WonderCommonlib.ArraySystem.unsafeGet(mat, 3);
  let a10 = WonderCommonlib.ArraySystem.unsafeGet(mat, 4);
  let a11 = WonderCommonlib.ArraySystem.unsafeGet(mat, 5);
  let a12 = WonderCommonlib.ArraySystem.unsafeGet(mat, 6);
  let a13 = WonderCommonlib.ArraySystem.unsafeGet(mat, 7);
  let a20 = WonderCommonlib.ArraySystem.unsafeGet(mat, 8);
  let a21 = WonderCommonlib.ArraySystem.unsafeGet(mat, 9);
  let a22 = WonderCommonlib.ArraySystem.unsafeGet(mat, 10);
  let a23 = WonderCommonlib.ArraySystem.unsafeGet(mat, 11);
  let a30 = WonderCommonlib.ArraySystem.unsafeGet(mat, 12);
  let a31 = WonderCommonlib.ArraySystem.unsafeGet(mat, 13);
  let a32 = WonderCommonlib.ArraySystem.unsafeGet(mat, 14);
  let a33 = WonderCommonlib.ArraySystem.unsafeGet(mat, 15);
  let b00 = a00 *. a11 -. a01 *. a10;
  let b01 = a00 *. a12 -. a02 *. a10;
  let b02 = a00 *. a13 -. a03 *. a10;
  let b03 = a01 *. a12 -. a02 *. a11;
  let b04 = a01 *. a13 -. a03 *. a11;
  let b05 = a02 *. a13 -. a03 *. a12;
  let b06 = a20 *. a31 -. a21 *. a30;
  let b07 = a20 *. a32 -. a22 *. a30;
  let b08 = a20 *. a33 -. a23 *. a30;
  let b09 = a21 *. a32 -. a22 *. a31;
  let b10 = a21 *. a33 -. a23 *. a31;
  let b11 = a22 *. a33 -. a23 *. a32;
  /* Calculate the determinant */
  let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
  switch det^ {
  | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
  | _ =>
    det := 1.0 /. det^;
    [|
      (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
      (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
      (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
      (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
      (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
      (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
      (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
      (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
      (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
      (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
      (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
      (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
      (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
      (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
      (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
      (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
    |]
  }
}; */
let invert = (mat: Float32Array.t) => {
  let a00 = Float32Array.unsafe_get(mat, 0);
  let a01 = Float32Array.unsafe_get(mat, 1);
  let a02 = Float32Array.unsafe_get(mat, 2);
  let a03 = Float32Array.unsafe_get(mat, 3);
  let a10 = Float32Array.unsafe_get(mat, 4);
  let a11 = Float32Array.unsafe_get(mat, 5);
  let a12 = Float32Array.unsafe_get(mat, 6);
  let a13 = Float32Array.unsafe_get(mat, 7);
  let a20 = Float32Array.unsafe_get(mat, 8);
  let a21 = Float32Array.unsafe_get(mat, 9);
  let a22 = Float32Array.unsafe_get(mat, 10);
  let a23 = Float32Array.unsafe_get(mat, 11);
  let a30 = Float32Array.unsafe_get(mat, 12);
  let a31 = Float32Array.unsafe_get(mat, 13);
  let a32 = Float32Array.unsafe_get(mat, 14);
  let a33 = Float32Array.unsafe_get(mat, 15);
  let b00 = a00 *. a11 -. a01 *. a10;
  let b01 = a00 *. a12 -. a02 *. a10;
  let b02 = a00 *. a13 -. a03 *. a10;
  let b03 = a01 *. a12 -. a02 *. a11;
  let b04 = a01 *. a13 -. a03 *. a11;
  let b05 = a02 *. a13 -. a03 *. a12;
  let b06 = a20 *. a31 -. a21 *. a30;
  let b07 = a20 *. a32 -. a22 *. a30;
  let b08 = a20 *. a33 -. a23 *. a30;
  let b09 = a21 *. a32 -. a22 *. a31;
  let b10 = a21 *. a33 -. a23 *. a31;
  let b11 = a22 *. a33 -. a23 *. a32;
  /* Calculate the determinant */
  let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
  switch det^ {
  | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
  | _ =>
    det := 1.0 /. det^;
    Float32Array.make([|
      (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
      (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
      (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
      (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
      (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
      (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
      (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
      (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
      (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
      (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
      (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
      (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
      (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
      (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
      (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
      (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
    |])
  }
}; */
let buildPerspective = (fovy: float, aspect: float, near: float, far: float) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "frustum shouldn't be null",
          () => {
            let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
            Js.Math.sin(fovy) <>=. 0.
          }
        )
      )
  );
  let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
  let s = Js.Math.sin(fovy);
  let rd = 1. /. (far -. near);
  let ct = Js.Math.cos(fovy) /. s;
  Float32Array.make([|
    ct /. aspect,
    0.,
    0.,
    0.,
    0.,
    ct,
    0.,
    0.,
    0.,
    0.,
    -. (far +. near) *. rd,
    (-1.),
    0.,
    0.,
    (-2.) *. far *. near *. rd,
    0.
  |])
};
/* 
let invert = (mat: Js.Array.t(float)) => {
  let a00 = WonderCommonlib.ArraySystem.unsafeGet(mat, 0);
  let a01 = WonderCommonlib.ArraySystem.unsafeGet(mat, 1);
  let a02 = WonderCommonlib.ArraySystem.unsafeGet(mat, 2);
  let a03 = WonderCommonlib.ArraySystem.unsafeGet(mat, 3);
  let a10 = WonderCommonlib.ArraySystem.unsafeGet(mat, 4);
  let a11 = WonderCommonlib.ArraySystem.unsafeGet(mat, 5);
  let a12 = WonderCommonlib.ArraySystem.unsafeGet(mat, 6);
  let a13 = WonderCommonlib.ArraySystem.unsafeGet(mat, 7);
  let a20 = WonderCommonlib.ArraySystem.unsafeGet(mat, 8);
  let a21 = WonderCommonlib.ArraySystem.unsafeGet(mat, 9);
  let a22 = WonderCommonlib.ArraySystem.unsafeGet(mat, 10);
  let a23 = WonderCommonlib.ArraySystem.unsafeGet(mat, 11);
  let a30 = WonderCommonlib.ArraySystem.unsafeGet(mat, 12);
  let a31 = WonderCommonlib.ArraySystem.unsafeGet(mat, 13);
  let a32 = WonderCommonlib.ArraySystem.unsafeGet(mat, 14);
  let a33 = WonderCommonlib.ArraySystem.unsafeGet(mat, 15);
  let b00 = a00 *. a11 -. a01 *. a10;
  let b01 = a00 *. a12 -. a02 *. a10;
  let b02 = a00 *. a13 -. a03 *. a10;
  let b03 = a01 *. a12 -. a02 *. a11;
  let b04 = a01 *. a13 -. a03 *. a11;
  let b05 = a02 *. a13 -. a03 *. a12;
  let b06 = a20 *. a31 -. a21 *. a30;
  let b07 = a20 *. a32 -. a22 *. a30;
  let b08 = a20 *. a33 -. a23 *. a30;
  let b09 = a21 *. a32 -. a22 *. a31;
  let b10 = a21 *. a33 -. a23 *. a31;
  let b11 = a22 *. a33 -. a23 *. a32;
  /* Calculate the determinant */
  let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
  switch det^ {
  | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
  | _ =>
    det := 1.0 /. det^;
    [|
      (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
      (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
      (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
      (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
      (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
      (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
      (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
      (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
      (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
      (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
      (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
      (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
      (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
      (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
      (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
      (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
    |]
  }
}; */
let invert = (mat: Float32Array.t) => {
  let a00 = Float32Array.unsafe_get(mat, 0);
  let a01 = Float32Array.unsafe_get(mat, 1);
  let a02 = Float32Array.unsafe_get(mat, 2);
  let a03 = Float32Array.unsafe_get(mat, 3);
  let a10 = Float32Array.unsafe_get(mat, 4);
  let a11 = Float32Array.unsafe_get(mat, 5);
  let a12 = Float32Array.unsafe_get(mat, 6);
  let a13 = Float32Array.unsafe_get(mat, 7);
  let a20 = Float32Array.unsafe_get(mat, 8);
  let a21 = Float32Array.unsafe_get(mat, 9);
  let a22 = Float32Array.unsafe_get(mat, 10);
  let a23 = Float32Array.unsafe_get(mat, 11);
  let a30 = Float32Array.unsafe_get(mat, 12);
  let a31 = Float32Array.unsafe_get(mat, 13);
  let a32 = Float32Array.unsafe_get(mat, 14);
  let a33 = Float32Array.unsafe_get(mat, 15);
  let b00 = a00 *. a11 -. a01 *. a10;
  let b01 = a00 *. a12 -. a02 *. a10;
  let b02 = a00 *. a13 -. a03 *. a10;
  let b03 = a01 *. a12 -. a02 *. a11;
  let b04 = a01 *. a13 -. a03 *. a11;
  let b05 = a02 *. a13 -. a03 *. a12;
  let b06 = a20 *. a31 -. a21 *. a30;
  let b07 = a20 *. a32 -. a22 *. a30;
  let b08 = a20 *. a33 -. a23 *. a30;
  let b09 = a21 *. a32 -. a22 *. a31;
  let b10 = a21 *. a33 -. a23 *. a31;
  let b11 = a22 *. a33 -. a23 *. a32;
  /* Calculate the determinant */
  let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
  switch det^ {
  | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
  | _ =>
    det := 1.0 /. det^;
    Float32Array.make([|
      (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
      (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
      (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
      (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
      (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
      (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
      (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
      (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
      (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
      (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
      (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
      (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
      (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
      (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
      (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
      (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
    |])
  }
};