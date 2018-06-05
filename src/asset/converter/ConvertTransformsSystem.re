external arrayFloat3ToTuple : array(float) => (float, float, float) =
  "%identity";

external arrayFloat4ToTuple : array(float) => (float, float, float, float) =
  "%identity";

let _getTranslationTuple = mat => (mat[12], mat[13], mat[14]);

let _getScaleTuple = mat => {
  let m11 = mat[0];
  let m12 = mat[1];
  let m13 = mat[2];
  let m21 = mat[4];
  let m22 = mat[5];
  let m23 = mat[6];
  let m31 = mat[8];
  let m32 = mat[9];
  let m33 = mat[10];
  (
    Js.Math.sqrt(m11 *. m11 +. m12 *. m12 +. m13 *. m13),
    Js.Math.sqrt(m21 *. m21 +. m22 *. m22 +. m23 *. m23),
    Js.Math.sqrt(m31 *. m31 +. m32 *. m32 +. m33 *. m33),
  );
};

let _getRotationTuple = mat => {
  let trace = mat[0] +. mat[5] +. mat[10];
  /* let out = [||];*/
  /* if (trace > 0.) {
       let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
       Array.unsafe_set(out, 3, 0.25 *. s);
       Array.unsafe_set(out, 0, (mat[6] -. mat[9]) /. s);
       Array.unsafe_set(out, 1, (mat[8] -. mat[2]) /. s);
       Array.unsafe_set(out, 2, (mat[1] -. mat[4]) /. s)
     } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
       let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
       Array.unsafe_set(out, 3, (mat[6] -. mat[9]) /. s);
       Array.unsafe_set(out, 0, 0.25 *. s);
       Array.unsafe_set(out, 1, (mat[1] +. mat[4]) /. s);
       Array.unsafe_set(out, 2, (mat[8] +. mat[2]) /. s);
     } else if (mat[5] > mat[10]) {
       let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
       Array.unsafe_set(out, 3, (mat[8] -. mat[2]) /. s);
       Array.unsafe_set(out, 0, (mat[1] +. mat[4]) /. s);
       Array.unsafe_set(out, 1, 0.25 *. s);
       Array.unsafe_set(out, 2, (mat[6] +. mat[9]) /. s)

     } else {
       let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
       Array.unsafe_set(out, 3, (mat[1] -. mat[4]) /. s);
       Array.unsafe_set(out, 0, (mat[8] +. mat[2]) /. s);
       Array.unsafe_set(out, 1, (mat[6] +. mat[9]) /. s);
       Array.unsafe_set(out, 2, 0.25 *. s)
     }; */
  if (trace > 0.) {
    let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
    (
      (mat[6] -. mat[9]) /. s,
      (mat[8] -. mat[2]) /. s,
      (mat[1] -. mat[4]) /. s,
      0.25 *. s,
    );
  } else if (mat[0] > mat[5] & mat[0] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[0] -. mat[5] -. mat[10]) *. 2.;
    (
      0.25 *. s,
      (mat[1] +. mat[4]) /. s,
      (mat[8] +. mat[2]) /. s,
      (mat[6] -. mat[9]) /. s,
    );
  } else if (mat[5] > mat[10]) {
    let s = Js.Math.sqrt(1.0 +. mat[5] -. mat[0] -. mat[10]) *. 2.;
    (
      (mat[1] +. mat[4]) /. s,
      0.25 *. s,
      (mat[6] +. mat[9]) /. s,
      (mat[8] -. mat[2]) /. s,
    );
  } else {
    let s = Js.Math.sqrt(1.0 +. mat[10] -. mat[0] -. mat[5]) *. 2.;
    (
      (mat[8] +. mat[2]) /. s,
      (mat[6] +. mat[9]) /. s,
      0.25 *. s,
      (mat[1] -. mat[4]) /. s,
    );
  };
};

let convertToTransforms = ({nodes}: GLTFType.gltf) : array(WDType.transform) =>
  nodes
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. arr, {matrix, translation, rotation, scale}: GLTFType.node) =>
         switch (matrix) {
         | None =>
           arr
           |> ArrayService.push(
                {
                  translation:
                    switch (translation) {
                    | None => None
                    | Some(translation) =>
                      Some(translation |> arrayFloat3ToTuple)
                    },
                  rotation:
                    switch (rotation) {
                    | None => None
                    | Some(rotation) => Some(rotation |> arrayFloat4ToTuple)
                    },
                  scale:
                    switch (scale) {
                    | None => None
                    | Some(scale) => Some(scale |> arrayFloat3ToTuple)
                    },
                }: WDType.transform,
              )
         | Some(matrix) =>
           arr
           |> ArrayService.push(
                {
                  translation: Some(_getTranslationTuple(matrix)),
                  rotation: Some(_getRotationTuple(matrix)),
                  scale: Some(_getScaleTuple(matrix)),
                }: WDType.transform,
              )
         },
       [||],
     );