open Js.Typed_array;

let getUint8_1 = (index: int, typeArray: Uint8Array.t) =>
  Uint8Array.unsafe_get(typeArray, index);

let getUint16_1 = (index: int, typeArray: Uint16Array.t) =>
  Uint16Array.unsafe_get(typeArray, index);

let getUint32_1 = (index: int, typeArray: Uint32Array.t) =>
  Uint32Array.unsafe_get(typeArray, index);

let getFloat1 = (index: int, typeArray: Float32Array.t) =>
  Float32Array.unsafe_get(typeArray, index);

let getFloat3 = (index: int, typeArray: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
|];

let getFloat4 = (index: int, typeArray: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
  Float32Array.unsafe_get(typeArray, index + 3),
|];

let getFloat3TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 3, typeArray);

let getFloat4TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 4, typeArray);

/* let getUint32TypeArray = (index: int, count, typeArray: Uint32Array.t) =>
   Uint32Array.subarray(~start=index, ~end_=index + count - 1, typeArray); */
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

let _checkNotExceedBound = (index, typeArray, getLengthFunc) =>
  WonderLog.(
    Contract.(
      Operators.(
        test(
          Log.buildAssertMessage(
            ~expect={j|not exceed bound|j},
            ~actual={j|exceed|j},
          ),
          () =>
          index < (typeArray |> getLengthFunc)
        )
      )
    )
  );

let setUint8_1 = (index: int, value: int, typeArray: Uint8Array.t) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            _checkNotExceedBound(index, typeArray, Uint8Array.length)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Uint8Array.unsafe_set(typeArray, index, value);
  typeArray;
};

let setUint16_1 = (index: int, value: int, typeArray: Uint16Array.t) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            _checkNotExceedBound(index, typeArray, Uint16Array.length)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Uint16Array.unsafe_set(typeArray, index, value);
  typeArray;
};

let setUint32_1 = (index: int, value: int, typeArray: Uint32Array.t) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            _checkNotExceedBound(index, typeArray, Uint32Array.length)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Uint32Array.unsafe_set(typeArray, index, value);
  typeArray;
};

let setFloat1 = (index: int, value, typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            _checkNotExceedBound(index, typeArray, Float32Array.length)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Float32Array.unsafe_set(typeArray, index, value);
  typeArray;
};

let setFloat3 =
    (index: int, record: Js.Array.t(float), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = record |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|record.length === 3|j},
          ~actual={j|is $len|j},
        ),
        () =>
        len == 3
      );

      _checkNotExceedBound(index + 2, typeArray, Float32Array.length);
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  /* Float32Array.setArrayOffset(record, index, typeArray); */
  for (i in index to index + 2) {
    Float32Array.unsafe_set(
      typeArray,
      i,
      Array.unsafe_get(record, i - index),
    );
  };
  typeArray;
};

let setFloat4 =
    (index: int, record: Js.Array.t(float), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = record |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|record.length === 4|j},
          ~actual={j|is $len|j},
        ),
        () =>
        len == 4
      );
      _checkNotExceedBound(index + 3, typeArray, Float32Array.length);
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  for (i in index to index + 3) {
    Float32Array.unsafe_set(
      typeArray,
      i,
      Array.unsafe_get(record, i - index),
    );
  };
  typeArray;
};

let setFloat3ByTuple = (index: int, (x, y, z), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            _checkNotExceedBound(index + 2, typeArray, Float32Array.length)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Float32Array.unsafe_set(typeArray, index, x);
  Float32Array.unsafe_set(typeArray, index + 1, y);
  Float32Array.unsafe_set(typeArray, index + 2, z);
  typeArray;
};

let setFloat4ByTuple = (index: int, (x, y, z, w), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            _checkNotExceedBound(index + 3, typeArray, Float32Array.length)
          )
        )
      ),
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );

  Float32Array.unsafe_set(typeArray, index, x);
  Float32Array.unsafe_set(typeArray, index + 1, y);
  Float32Array.unsafe_set(typeArray, index + 2, z);
  Float32Array.unsafe_set(typeArray, index + 3, w);
  typeArray;
};

let getFloat16 = (index: int, typeArray: Float32Array.t) => [|
  Float32Array.unsafe_get(typeArray, index),
  Float32Array.unsafe_get(typeArray, index + 1),
  Float32Array.unsafe_get(typeArray, index + 2),
  Float32Array.unsafe_get(typeArray, index + 3),
  Float32Array.unsafe_get(typeArray, index + 4),
  Float32Array.unsafe_get(typeArray, index + 5),
  Float32Array.unsafe_get(typeArray, index + 6),
  Float32Array.unsafe_get(typeArray, index + 7),
  Float32Array.unsafe_get(typeArray, index + 8),
  Float32Array.unsafe_get(typeArray, index + 9),
  Float32Array.unsafe_get(typeArray, index + 10),
  Float32Array.unsafe_get(typeArray, index + 11),
  Float32Array.unsafe_get(typeArray, index + 12),
  Float32Array.unsafe_get(typeArray, index + 13),
  Float32Array.unsafe_get(typeArray, index + 14),
  Float32Array.unsafe_get(typeArray, index + 15),
|];

let getFloat16TypeArray = (index: int, typeArray: Float32Array.t) =>
  Float32Array.subarray(~start=index, ~end_=index + 16, typeArray);

/* let getFloat16TypeArrayToTarget =
       (index: int, sourceTypeArr: Float32Array.t, targetTypeArr: Float32Array.t) => {
     for (i in 0 to 15) {
       Float32Array.unsafe_set(targetTypeArr, i, Float32Array.unsafe_get(sourceTypeArr, i + index))
     };
     targetTypeArr
   }; */
let setFloat16 =
    (index: int, record: Js.Array.t(float), typeArray: Float32Array.t) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      let len = record |> Js.Array.length;
      test(
        Log.buildAssertMessage(
          ~expect={j|record.length === 16|j},
          ~actual={j|is $len|j},
        ),
        () =>
        len == 16
      );
      _checkNotExceedBound(index + 15, typeArray, Float32Array.length);
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  /* Float32Array.setArrayOffset(record, index, typeArray); */
  for (i in index to index + 15) {
    Float32Array.unsafe_set(
      typeArray,
      i,
      Array.unsafe_get(record, i - index),
    );
  };
  typeArray;
};

/* let getUint16ArraySingleVale = (index: int, typeArray: Uint16Array.t) =>
     Uint16Array.unsafe_get(typeArray, index);

   let setUint16ArraySingleVale = (index: int, record: int, typeArray: Uint16Array.t) =>
     Uint16Array.unsafe_set(typeArray, index, record); */
/* let fillFloat32Array = (typeArray: Float32Array.t, dataArr: Js.Array.t(float), startIndex: int) => {
     WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;
         let actualLen = Js.Array.length(dataArr) + startIndex;
         let range = Float32Array.length(typeArray);
         test(
           Log.buildAssertMessage(
             ~expect={j|not exceed Float32Array range:$range|j},
             ~actual={j|is $actualLen|j}
           ),
           () => actualLen <= range
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );
     let dataArrIndex = ref(0);
     for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
       /* Js.Typed_array.Float32Array.unsafe_set(typeArray, i, dataArr[dataArrIndex^]); */
       Js.Typed_array.Float32Array.unsafe_set(typeArray, i, Array.unsafe_get(dataArr, dataArrIndex^));
       dataArrIndex := succ(dataArrIndex^)
     };
     typeArray
   }; */
let fillFloat32ArrayWithOffset =
    (targetTypeArr, sourceTypeArr: Float32Array.t, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|offset should >= 0|j},
          ~actual={j|is $offset|j},
        ),
        () =>
        offset >= 0
      );
      let sourceTypeArrLen = Float32Array.length(sourceTypeArr);
      let targetTypeArrLen = Float32Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j|not|j},
        ),
        () =>
        sourceTypeArrLen + offset <= targetTypeArrLen
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  targetTypeArr
  |> Float32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset);
};

let getFloat32Array =
    (typeArray: Float32Array.t, startIndex: int, endIndex: int) =>
  Float32Array.slice(~start=startIndex, ~end_=endIndex, typeArray);

/* let fillUint16Array = (typeArray: Uint16Array.t, dataArr: Js.Array.t(int), startIndex: int) => {
     WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;
         let actualLen = Js.Array.length(dataArr) + startIndex;
         let range = Uint16Array.length(typeArray);
         test(
           Log.buildAssertMessage(
             ~expect={j|not exceed Uint16Array range:$range|j},
             ~actual={j|is $actualLen|j}
           ),
           () => actualLen <= range
         )
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData)
     );
     let dataArrIndex = ref(0);
     for (i in startIndex to startIndex + Js.Array.length(dataArr) |> pred) {
       Js.Typed_array.Uint16Array.unsafe_set(typeArray, i, Array.unsafe_get(dataArr, dataArrIndex^));
       dataArrIndex := succ(dataArrIndex^)
     };
     typeArray
   }; */

/* let fillUint8ArrayWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
     WonderLog.Contract.requireCheck(
       () => {
         open WonderLog;
         open Contract;
         open Operators;
         test(
           Log.buildAssertMessage(
             ~expect={j|offset should >= 0|j},
             ~actual={j|is $offset|j},
           ),
           () =>
           offset >= 0
         );
         let sourceTypeArrLen = Uint8Array.length(sourceTypeArr);
         let targetTypeArrLen = Uint8Array.length(targetTypeArr);
         test(
           Log.buildAssertMessage(
             ~expect=
               {j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
             ~actual={j|not|j},
           ),
           () =>
           sourceTypeArrLen + offset <= targetTypeArrLen
         );
       },
       IsDebugMainService.getIsDebug(StateDataMain.stateData),
     );
     targetTypeArr
     |> Uint8Array.setArrayOffset(Obj.magic(sourceTypeArr), offset);
   }; */

let fillUint16ArrayWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|offset should >= 0|j},
          ~actual={j|is $offset|j},
        ),
        () =>
        offset >= 0
      );
      let sourceTypeArrLen = Uint16Array.length(sourceTypeArr);
      let targetTypeArrLen = Uint16Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j|not|j},
        ),
        () =>
        sourceTypeArrLen + offset <= targetTypeArrLen
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  targetTypeArr
  |> Uint16Array.setArrayOffset(Obj.magic(sourceTypeArr), offset);
};

let fillUint32ArrayWithOffset = (targetTypeArr, sourceTypeArr, offset) => {
  WonderLog.Contract.requireCheck(
    () => {
      open WonderLog;
      open Contract;
      open Operators;
      test(
        Log.buildAssertMessage(
          ~expect={j|offset should >= 0|j},
          ~actual={j|is $offset|j},
        ),
        () =>
        offset >= 0
      );
      let sourceTypeArrLen = Uint32Array.length(sourceTypeArr);
      let targetTypeArrLen = Uint32Array.length(targetTypeArr);
      test(
        Log.buildAssertMessage(
          ~expect=
            {j|sourceTypeArr.length:$sourceTypeArrLen + offset:$offset <= targetTypeArr.length:$targetTypeArrLen|j},
          ~actual={j|not|j},
        ),
        () =>
        sourceTypeArrLen + offset <= targetTypeArrLen
      );
    },
    IsDebugMainService.getIsDebug(StateDataMain.stateData),
  );
  targetTypeArr
  |> Uint32Array.setArrayOffset(Obj.magic(sourceTypeArr), offset);
};

let getUint16Array =
    (typeArray: Uint16Array.t, startIndex: int, endIndex: int) =>
  Uint16Array.slice(~start=startIndex, ~end_=endIndex, typeArray);

let getUint32Array =
    (typeArray: Uint32Array.t, startIndex: int, endIndex: int) =>
  Uint32Array.slice(~start=startIndex, ~end_=endIndex, typeArray);

let _setFloat32ArrayWithFloat32Array =
  (. targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
    Js.Typed_array.Float32Array.unsafe_set(
      targetTypeArr,
      typeArrIndex,
      Js.Typed_array.Float32Array.unsafe_get(sourceTypeArr, i),
    );

let _setUint8ArrayWithUint8Array =
  (. targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
    Js.Typed_array.Uint8Array.unsafe_set(
      targetTypeArr,
      typeArrIndex,
      Js.Typed_array.Uint8Array.unsafe_get(sourceTypeArr, i),
    );

let _setUint16ArrayWithUint16Array =
  (. targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
    Js.Typed_array.Uint16Array.unsafe_set(
      targetTypeArr,
      typeArrIndex,
      Js.Typed_array.Uint16Array.unsafe_get(sourceTypeArr, i),
    );

let _setUint32ArrayWithUint32Array =
  (. targetTypeArr, sourceTypeArr, typeArrIndex, i) =>
    Js.Typed_array.Uint32Array.unsafe_set(
      targetTypeArr,
      typeArrIndex,
      Js.Typed_array.Uint32Array.unsafe_get(sourceTypeArr, i),
    );

let _fillTypeArrayWithTypeArr =
    (
      (targetTypeArr, targetStartIndex),
      (sourceTypeArr, sourceStartIndex),
      endIndex,
      _setTypeArrWithTypeArr,
    ) => {
  let typeArrIndex = ref(targetStartIndex);
  for (i in sourceStartIndex to endIndex - 1) {
    _setTypeArrWithTypeArr(. targetTypeArr, sourceTypeArr, typeArrIndex^, i);
    typeArrIndex := succ(typeArrIndex^);
  };
  typeArrIndex^;
};

let fillUint8ArrayWithUint8Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArr(
    targetData,
    sourceData,
    endIndex,
    _setUint8ArrayWithUint8Array,
  );

let fillUint16ArrayWithUint16Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArr(
    targetData,
    sourceData,
    endIndex,
    _setUint16ArrayWithUint16Array,
  );

let fillUint32ArrayWithUint32Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArr(
    targetData,
    sourceData,
    endIndex,
    _setUint32ArrayWithUint32Array,
  );

let fillFloat32ArrayWithFloat32Array = (targetData, sourceData, endIndex) =>
  _fillTypeArrayWithTypeArr(
    targetData,
    sourceData,
    endIndex,
    _setFloat32ArrayWithFloat32Array,
  );

/* let makeFloat32Array = [@bs] ((record) => Float32Array.make(record));

   let makeUint16Array = [@bs] ((record) => Uint16Array.make(record)); */

let setUint8Array = (sourceTypeArr, targetTypeArr) => {
  targetTypeArr
  |> Uint8Array.setArray(sourceTypeArr |> TypeArrayType.uint8ToArrayUint8Elt);
  targetTypeArr;
};

let setUint16Array = (sourceTypeArr, targetTypeArr) => {
  targetTypeArr
  |> Uint16Array.setArray(
       sourceTypeArr |> TypeArrayType.uint16ToArrayUint16Elt,
     );
  targetTypeArr;
};

let setUint32Array = (sourceTypeArr, targetTypeArr) => {
  targetTypeArr
  |> Uint32Array.setArray(
       sourceTypeArr |> TypeArrayType.uint32ToArrayUint32Elt,
     );
  targetTypeArr;
};

let setFloat32Array = (sourceTypeArr, targetTypeArr) => {
  targetTypeArr
  |> Float32Array.setArray(
       sourceTypeArr |> TypeArrayType.float32ToArrayFloat32Elt,
     );
  targetTypeArr;
};