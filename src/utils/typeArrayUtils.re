open Js.Typed_array;

open Contract;

let getMatrix4DataSize = () => 16;

let getVector3DataSize = () => 3;

let getFloat3 = (index: int, typeArray: Float32Array.t) => (
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2)
);

let setFloat3 = (index: int, data: Js.Array.t(float), typeArray: Float32Array.t) => {
  requireCheck(
    () => Contract.Operators.(test("data.length should === 3", () => Js.Array.length(data) == 3))
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

let setFloat16 = (index: int, data: Js.Array.t(float), typeArray: Float32Array.t) => {
  requireCheck(
    () => Contract.Operators.(test("data.length should === 16", () => Js.Array.length(data) == 16))
  );
  Float32Array.setArrayOffset(data, index, typeArray);
  typeArray
};

let getUint16ArraySingleVale = (index: int, typeArray: Uint16Array.t) =>
  Uint16Array.unsafe_get(typeArray, index);

let setUint16ArraySingleVale = (index: int, data: int, typeArray: Uint16Array.t) =>
  Uint16Array.unsafe_set(typeArray, index, data);

let fillFloat32Arr = (typeArr: Float32Array.t, dataArr: Js.Array.t(float), startIndex: int) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "should not exceed float32Arr range",
          () => Js.Array.length(dataArr) + startIndex <= Float32Array.length(typeArr)
        )
      )
  );
  Float32Array.setArrayOffset(dataArr, startIndex, typeArr)
};

let getFloat32ArrSubarray = (typeArr: Float32Array.t, startIndex: int, endIndex: int) =>
  Float32Array.subarray(startIndex, endIndex, typeArr);

let fillUint16Arr = (typeArr: Uint16Array.t, dataArr: Js.Array.t(int), startIndex: int) =>{
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "should not exceed uint32Arr range",
          () => Js.Array.length(dataArr) + startIndex <= Uint16Array.length(typeArr)
        )
      )
  );
  Uint16Array.setArrayOffset(dataArr, startIndex, typeArr);
};

let getUint16ArrSubarray = (typeArr: Uint16Array.t, startIndex: int, endIndex: int) =>
  Uint16Array.subarray(startIndex, endIndex, typeArr);