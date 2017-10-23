open Js.Typed_array;

let fromTranslation (translationTypeArr: Float32Array.t) (index: int) (out: ArraySystem.t float) => {
  ArraySystem.unsafeSet out 0 1.;
  /* ArraySystem.unsafeSet out 0 1.; */
  ArraySystem.unsafeSet out 1 0.;
  ArraySystem.unsafeSet out 2 0.;
  ArraySystem.unsafeSet out 3 0.;
  ArraySystem.unsafeSet out 4 0.;
  ArraySystem.unsafeSet out 5 1.;
  ArraySystem.unsafeSet out 6 0.;
  ArraySystem.unsafeSet out 7 0.;
  ArraySystem.unsafeSet out 8 0.;
  ArraySystem.unsafeSet out 9 0.;
  ArraySystem.unsafeSet out 10 1.;
  ArraySystem.unsafeSet out 11 0.;
  ArraySystem.unsafeSet out 12 (Float32Array.unsafe_get translationTypeArr index);
  ArraySystem.unsafeSet out 13 (Float32Array.unsafe_get translationTypeArr (index + 1));
  ArraySystem.unsafeSet out 14 (Float32Array.unsafe_get translationTypeArr (index + 2));
  ArraySystem.unsafeSet out 15 1.;
  out
};

let multiply
    (aMatTypeArr: Float32Array.t)
    (aMatIndex: int)
    (bMatArr: ArraySystem.t float)
    (bMatIndex: int)
    (out: ArraySystem.t float) => {
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
  /* Cache only the current line of the second matrix */
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
  out
};