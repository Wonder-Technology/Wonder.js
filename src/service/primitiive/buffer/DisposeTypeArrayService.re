let deleteBySwapAndResetFloat32TypeArr =
  [@bs]
  (
    ((sourceIndex, targetIndex), typeArr, length, defaultValueArr) => {
      open Js.Typed_array;
      for (i in 0 to length - 1) {
        Float32Array.unsafe_set(
          typeArr,
          sourceIndex + i,
          Float32Array.unsafe_get(typeArr, targetIndex + i)
        );
        Float32Array.unsafe_set(typeArr, targetIndex + i, defaultValueArr[i])
      };
      typeArr
    }
  );

let deleteSingleValueBySwapAndResetFloat32TypeArr =
  [@bs]
  (
    ((sourceIndex, targetIndex), typeArr, length: int, defaultValue) => {
      open Js.Typed_array;
      Float32Array.unsafe_set(typeArr, sourceIndex, Float32Array.unsafe_get(typeArr, targetIndex));
      Float32Array.unsafe_set(typeArr, targetIndex, defaultValue);
      typeArr
    }
  );

let deleteSingleValueBySwapAndResetUint8TypeArr = (sourceIndex, lastIndex, typeArr, defaultValue) => {
  open Js.Typed_array;
  Uint8Array.unsafe_set(typeArr, sourceIndex, Uint8Array.unsafe_get(typeArr, lastIndex));
  Uint8Array.unsafe_set(typeArr, lastIndex, defaultValue);
  typeArr
};

let deleteAndResetFloat32TypeArr =
  [@bs]
  (
    (sourceIndex, length, defaultValueArr, typeArr) => {
      open Js.Typed_array;
      for (i in 0 to length - 1) {
        Float32Array.unsafe_set(typeArr, sourceIndex + i, defaultValueArr[i])
      };
      typeArr
    }
  );

let deleteAndResetFloat32 =
  [@bs]
  (
    (sourceIndex, defaultValue, typeArr) => {
      open Js.Typed_array;
      Float32Array.unsafe_set(typeArr, sourceIndex, defaultValue);
      typeArr
    }
  );

let deleteAndResetUint32 =
  [@bs]
  (
    (sourceIndex, defaultValue, typeArr) => {
      open Js.Typed_array;
      Uint32Array.unsafe_set(typeArr, sourceIndex, defaultValue);
      typeArr
    }
  );