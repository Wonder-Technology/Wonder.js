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
  /* Float32Array.setArrayOffset(data, index, typeArray); */
  for (i in index to index + 2) {
    Float32Array.unsafe_set(typeArray, i, Array.unsafe_get(data, i - index))
  };
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
  /* Float32Array.setArrayOffset(data, index, typeArray); */
  for (i in index to index + 15) {
    Float32Array.unsafe_set(typeArray, i, Array.unsafe_get(data, i - index))
  };
  typeArray
};

let getUint16ArraySingleVale = (index: int, typeArray: Uint16Array.t) =>
  Uint16Array.unsafe_get(typeArray, index);

let setUint16ArraySingleVale = (index: int, data: int, typeArray: Uint16Array.t) =>
  Uint16Array.unsafe_set(typeArray, index, data);

let fillFloat32Array = (typeArr: Float32Array.t, dataArr: Js.Array.t(float), startIndex: int) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "should not exceed Float32Array range",
          () => Js.Array.length(dataArr) + startIndex <= Float32Array.length(typeArr)
        )
      )
  );
  let dataArrIndex = ref(0);
  for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
    /* Js.Typed_array.Float32Array.unsafe_set(typeArr, i, dataArr[dataArrIndex^]); */
    Js.Typed_array.Float32Array.unsafe_set(typeArr, i, Array.unsafe_get(dataArr, dataArrIndex^));
    dataArrIndex := succ(dataArrIndex^)
  };
  typeArr
};

let fillFloat32ArrayWithOffset = (targetTypeArr, sourceTypeArr: Float32Array.t, offset) => {
  requireCheck(
    () => {
      open Contract.Operators;
      test("offset should >= 0", () => offset >= 0);
      test(
        "sourceTypeArr.length + offset should <= targetTypeArr.length",
        () => offset + Float32Array.length(sourceTypeArr) <= Float32Array.length(targetTypeArr)
      )
    }
  );
  targetTypeArr |> Float32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset)
};

let fillFloat32ArrayWithFloat32Array =
    (targetTypeArr, targetStartIndex, sourceTypeArr, sourceStartIndex, endIndex) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "targetStartIndex should <= sourceStartIndex",
          () => targetStartIndex <= sourceStartIndex
        )
      )
  );
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    Js.Typed_array.Float32Array.unsafe_set(
      targetTypeArr,
      typeArrIndex^,
      Js.Typed_array.Float32Array.unsafe_get(sourceTypeArr, i)
    );
    typeArrIndex := succ(typeArrIndex^)
  };
  typeArrIndex^
};

let getFloat32ArrSubarray = (typeArr: Float32Array.t, startIndex: int, endIndex: int) =>
  Float32Array.subarray(~start=startIndex, ~end_=endIndex, typeArr);

let fillUint16Array = (typeArr: Uint16Array.t, dataArr: Js.Array.t(int), startIndex: int) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "should not exceed Uint16Array range",
          () => Js.Array.length(dataArr) + startIndex <= Uint16Array.length(typeArr)
        )
      )
  );
  let dataArrIndex = ref(0);
  for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
    Js.Typed_array.Uint16Array.unsafe_set(typeArr, i, Array.unsafe_get(dataArr, dataArrIndex^));
    dataArrIndex := succ(dataArrIndex^)
  };
  typeArr
};

let fillUint16ArrWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
  requireCheck(
    () => {
      open Contract.Operators;
      test("offset should >= 0", () => offset >= 0);
      test(
        "sourceTypeArr.length + offset should <= targetTypeArr.length",
        () => offset + Uint16Array.length(sourceTypeArr) <= Uint16Array.length(targetTypeArr)
      )
    }
  );
  targetTypeArr |> Uint16Array.setArrayOffset(Obj.magic(sourceTypeArr), offset)
};

let fillUint16ArrayWithUint16Array =
    (targetTypeArr, targetStartIndex, sourceTypeArr, sourceStartIndex, endIndex) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "targetStartIndex should <= sourceStartIndex",
          () => targetStartIndex <= sourceStartIndex
        )
      )
  );
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    Js.Typed_array.Uint16Array.unsafe_set(
      targetTypeArr,
      typeArrIndex^,
      Js.Typed_array.Uint16Array.unsafe_get(sourceTypeArr, i)
    );
    typeArrIndex := succ(typeArrIndex^)
  };
  typeArrIndex^
};

let getUint16ArrSubarray = (typeArr: Uint16Array.t, startIndex: int, endIndex: int) =>
  Uint16Array.subarray(~start=startIndex, ~end_=endIndex, typeArr);