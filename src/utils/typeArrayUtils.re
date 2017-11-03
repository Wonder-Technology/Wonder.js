open Js.Typed_array;

open Contract;

let getMatrix4DataSize = () => 16;

let getVector3DataSize = () => 3;

let getFloat3 = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2)
);

let setFloat3 = (index: int, data: ArraySystem.t(float), typeArray: Float32Array.t) => {
  requireCheck(
    () =>
      Contract.Operators.(test("data.length should === 3", () => ArraySystem.length(data) == 3))
  );
  Float32Array.setArrayOffset(data, index, typeArray);
  typeArray
};

let getFloat16 = (index: int, typeArr: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArr, index),
  Float32Array.unsafe_get(typeArr, index + 1),
  Float32Array.unsafe_get(typeArr, index + 2),
  Float32Array.unsafe_get(typeArr, index + 3),
  Float32Array.unsafe_get(typeArr, index + 4),
  Float32Array.unsafe_get(typeArr, index + 5),
  Float32Array.unsafe_get(typeArr, index + 6),
  Float32Array.unsafe_get(typeArr, index + 7),
  Float32Array.unsafe_get(typeArr, index + 8),
  Float32Array.unsafe_get(typeArr, index + 9),
  Float32Array.unsafe_get(typeArr, index + 10),
  Float32Array.unsafe_get(typeArr, index + 11),
  Float32Array.unsafe_get(typeArr, index + 12),
  Float32Array.unsafe_get(typeArr, index + 13),
  Float32Array.unsafe_get(typeArr, index + 14),
  Float32Array.unsafe_get(typeArr, index + 15)
|];

let setFloat16 = (index: int, data: ArraySystem.t(float), typeArray: Float32Array.t) => {
  requireCheck(
    () =>
      Contract.Operators.(test("data.length should === 16", () => ArraySystem.length(data) == 16))
  );
  Float32Array.setArrayOffset(data, index, typeArray);
  typeArray
};

let setUint32ArraySingleVale = (index: int, data: int, typeArray: Uint32Array.t) =>
  Uint32Array.unsafe_set(typeArray, index, data);