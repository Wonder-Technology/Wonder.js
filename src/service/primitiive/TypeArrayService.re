open Js.Typed_array;

let getFloat3 = (index: int, typeArray: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2)
|];

let setFloat3 = (index: int, data: Js.Array.t(float), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = data |> Js.Array.length;
      test(
        Log.buildAssertMessage(~expect={j|data.length === 3|j}, ~actual={j|is $len|j}),
        () => len == 3
      )
    },
    StateData.stateData.isDebug
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
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = data |> Js.Array.length;
      test(
        Log.buildAssertMessage(~expect={j|data.length === 16|j}, ~actual={j|is $len|j}),
        () => len == 16
      )
    },
    StateData.stateData.isDebug
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

let fillFloat32Array =
  [@bs]
  (
    (typeArr: Float32Array.t, dataArr: Js.Array.t(float), startIndex: int) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let actualLen = Js.Array.length(dataArr) + startIndex;
          let range = Float32Array.length(typeArr);
          test(
            Log.buildAssertMessage(
              ~expect={j|not exceed Float32Array range:$range|j},
              ~actual={j|is $actualLen|j}
            ),
            () => actualLen <= range
          )
        },
        StateData.stateData.isDebug
      );
      let dataArrIndex = ref(0);
      for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
        /* Js.Typed_array.Float32Array.unsafe_set(typeArr, i, dataArr[dataArrIndex^]); */
        Js.Typed_array.Float32Array.unsafe_set(
          typeArr,
          i,
          Array.unsafe_get(dataArr, dataArrIndex^)
        );
        dataArrIndex := succ(dataArrIndex^)
      };
      typeArr
    }
  );

let fillFloat32ArrayWithOffset = (targetTypeArr, sourceTypeArr: Float32Array.t, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|offset should >= 0|j}, ~actual={j|is $offset|j}),
        () => offset >= 0
      );
      let sourceTypeArrLen = Float32Array.length(sourceTypeArr);
      let targetTypeArrLen = Float32Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect={j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j||j}
        ),
        () => sourceTypeArrLen + offset <= targetTypeArrLen
      )
    },
    StateData.stateData.isDebug
  );
  targetTypeArr |> Float32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset)
};

let getFloat32ArrSubarray = (typeArr: Float32Array.t, startIndex: int, endIndex: int) =>
  Float32Array.subarray(~start=startIndex, ~end_=endIndex, typeArr);

let fillUint16Array =
  [@bs]
  (
    (typeArr: Uint16Array.t, dataArr: Js.Array.t(int), startIndex: int) => {
      WonderLog.Contract.requireCheck(
        () => {
          open WonderLog;
          open Contract;
          open Operators;
          let actualLen = Js.Array.length(dataArr) + startIndex;
          let range = Uint16Array.length(typeArr);
          test(
            Log.buildAssertMessage(
              ~expect={j|not exceed Uint16Array range:$range|j},
              ~actual={j|is $actualLen|j}
            ),
            () => actualLen <= range
          )
        },
        StateData.stateData.isDebug
      );
      let dataArrIndex = ref(0);
      for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
        Js.Typed_array.Uint16Array.unsafe_set(
          typeArr,
          i,
          Array.unsafe_get(dataArr, dataArrIndex^)
        );
        dataArrIndex := succ(dataArrIndex^)
      };
      typeArr
    }
  );

let fillUint16ArrWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(~expect={j|offset should >= 0|j}, ~actual={j|is $offset|j}),
        () => offset >= 0
      );
      let sourceTypeArrLen = Uint16Array.length(sourceTypeArr);
      let targetTypeArrLen = Uint16Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect={j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j||j}
        ),
        () => sourceTypeArrLen + offset <= targetTypeArrLen
      )
    },
    StateData.stateData.isDebug
  );
  targetTypeArr |> Uint16Array.setArrayOffset(Obj.magic(sourceTypeArr), offset)
};

let getUint16ArrSubarray = (typeArr: Uint16Array.t, startIndex: int, endIndex: int) =>
  Uint16Array.subarray(~start=startIndex, ~end_=endIndex, typeArr);

let _setFloat32ArrayWithFloat32Array =
  [@bs]
  (
    (targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
      Js.Typed_array.Float32Array.unsafe_set(
        targetTypeArr,
        typeArrIndex,
        Js.Typed_array.Float32Array.unsafe_get(sourceTypeArr, i)
      )
  );

let _setUint16ArrayWithUint16Array =
  [@bs]
  (
    (targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
      Js.Typed_array.Uint16Array.unsafe_set(
        targetTypeArr,
        typeArrIndex,
        Js.Typed_array.Uint16Array.unsafe_get(sourceTypeArr, i)
      )
  );

let _fillTypeArrayWithTypeArray =
    (
      (targetTypeArr, targetStartIndex),
      (sourceTypeArr, sourceStartIndex),
      endIndex,
      _setTypeArrayWithTypeArray
    ) => {
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    [@bs] _setTypeArrayWithTypeArray(targetTypeArr, sourceTypeArr, typeArrIndex^, i);
    typeArrIndex := succ(typeArrIndex^)
  };
  typeArrIndex^
};

let fillUint16ArrayWithUint16Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArray(targetData, sourceData, endIndex, _setUint16ArrayWithUint16Array);

let fillFloat32ArrayWithFloat32Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArray(targetData, sourceData, endIndex, _setFloat32ArrayWithFloat32Array);

let makeFloat32Array = [@bs] ((data) => Float32Array.make(data));

let makeUint16Array = [@bs] ((data) => Uint16Array.make(data));