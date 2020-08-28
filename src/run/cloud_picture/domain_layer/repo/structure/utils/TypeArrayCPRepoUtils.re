open Js.Typed_array;

let _checkNotExceedBound = (getLengthFunc, index, typeArray) =>
  Contract.(
    Operators.(
      test(
        Log.buildAssertMessage(
          ~expect={j|not exceed bound|j},
          ~actual={j|exceed|j},
        ),
        () =>
        index < typeArray->getLengthFunc
      )
    )
  );

let getFloat16TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 16, typeArray);

let setFloat16 =
    (
      index: int,
      (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15),
      typeArray: Float32Array.t,
    ) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          _checkNotExceedBound(Float32Array.length, index + 15, typeArray)
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {
      Float32Array.unsafe_set(typeArray, index + 0, a0);
      Float32Array.unsafe_set(typeArray, index + 1, a1);
      Float32Array.unsafe_set(typeArray, index + 2, a2);
      Float32Array.unsafe_set(typeArray, index + 3, a3);
      Float32Array.unsafe_set(typeArray, index + 4, a4);
      Float32Array.unsafe_set(typeArray, index + 5, a5);
      Float32Array.unsafe_set(typeArray, index + 6, a6);
      Float32Array.unsafe_set(typeArray, index + 7, a7);
      Float32Array.unsafe_set(typeArray, index + 8, a8);
      Float32Array.unsafe_set(typeArray, index + 9, a9);
      Float32Array.unsafe_set(typeArray, index + 10, a10);
      Float32Array.unsafe_set(typeArray, index + 11, a11);
      Float32Array.unsafe_set(typeArray, index + 12, a12);
      Float32Array.unsafe_set(typeArray, index + 13, a13);
      Float32Array.unsafe_set(typeArray, index + 14, a14);
      Float32Array.unsafe_set(typeArray, index + 15, a15);
    });
};

let setFloat3 = (index: int, (x, y, z), typeArray: Float32Array.t) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          _checkNotExceedBound(Float32Array.length, index + 2, typeArray)
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {
      Float32Array.unsafe_set(typeArray, index, x);
      Float32Array.unsafe_set(typeArray, index + 1, y);
      Float32Array.unsafe_set(typeArray, index + 2, z);
    });
};

let setFloat4 = (index: int, (x, y, z, w), typeArray: Float32Array.t) => {
  Contract.requireCheck(
    () => {
      Contract.(
        Operators.(
          _checkNotExceedBound(Float32Array.length, index + 3, typeArray)
        )
      )
    },
    DpContainer.unsafeGetOtherConfigDp().getIsDebug(),
  )
  ->Result.mapSuccess(() => {
      Float32Array.unsafe_set(typeArray, index, x);
      Float32Array.unsafe_set(typeArray, index + 1, y);
      Float32Array.unsafe_set(typeArray, index + 2, z);
      Float32Array.unsafe_set(typeArray, index + 3, w);
    });
};

let getFloat3Tuple = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
);

let getFloat4Tuple = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
  Float32Array.unsafe_get(typeArray, index + 3),
);
