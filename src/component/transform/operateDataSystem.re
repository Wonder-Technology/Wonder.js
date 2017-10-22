open Js.Typed_array;

open StateDataType;

open TypeArrayUtils;

let getMaxCount () => DataBufferConfig.dataBufferConfig.transformDataBufferCount;

let setLocalPositionTypeArr =
  (
    fun (index: int) (positions: ArraySystem.t float) (localPositions: Float32Array.t) =>
      setFloat3 index positions localPositions
  )
  [@bs];

let setLocalToWorldMatricesTypeArr =
  (
    fun (index: int) (mat: ArraySystem.t float) (localToWorldMatrices: Float32Array.t) =>
      setFloat16 index mat localToWorldMatrices
  )
  [@bs];

let getMatrix4DataIndex (index: int) => index * getMatrix4DataSize ();

let getVector3DataIndex (index: int) => index * getVector3DataSize ();

let _isIndexUsed (index: int) (transformData: transformData) => {
  open Js.Option;
  let indexStr = Js.Int.toString index;
  isSome (HashMapSystem.get transformData.parentMap indexStr)
  || ArraySystem.length (HashMapSystem.unsafeGet transformData.childMap indexStr)
  > 0
  || not (Float32Array.unsafe_get transformData.localPositions (getVector3DataIndex index) == 0.)
};

let _moveTypeArrDataTo
    (sourceIndex: int)
    (targetIndex: int)
    (length: int)
    (typeArr: Float32Array.t) =>
  for i in 0 to (length - 1) {
    Float32Array.unsafe_set
      typeArr (targetIndex + i) (Float32Array.unsafe_get typeArr (sourceIndex + i))
  };

let _moveAllTypeArrDataTo
    (sourceIndex: int)
    (targetIndex: int)
    ({localToWorldMatrices, localPositions} as transformData) => {
  _moveTypeArrDataTo
    (getMatrix4DataIndex sourceIndex)
    (getMatrix4DataIndex targetIndex)
    (getMatrix4DataSize ())
    localToWorldMatrices
  |> ignore;
  _moveTypeArrDataTo
    (getVector3DataIndex sourceIndex)
    (getVector3DataIndex targetIndex)
    (getVector3DataSize ())
    localPositions
  |> ignore;
  transformData
};

let _moveMapDataTo (sourceIndex: int) (targetIndex: int) (map: HashMapSystem.t 'a) =>
  HashMapSystem.set
    map (Js.Int.toString targetIndex) (HashMapSystem.unsafeGet map (Js.Int.toString sourceIndex));

let _moveAllMapDataTo
    (sourceIndex: int)
    (targetIndex: int)
    ({parentMap, childMap} as transformData) => {
  _moveMapDataTo sourceIndex targetIndex parentMap |> ignore;
  _moveMapDataTo sourceIndex targetIndex childMap |> ignore;
  transformData
};

let moveTo (sourceIndex: int) (targetIndex: int) (transformData: transformData) =>
  /* requireCheck (
       fun () => {
         open Contract.Operators;
         test "sourceIndex should be used" (fun () => {
           _isIndexUsed sourceIndex transformData |> assertTrue;
         });
         test "targetIndex shouldn't be used" (fun () => {
           _isIndexUsed targetIndex transformData |> assertFalse;
         })
       }
     ); */
  _moveAllTypeArrDataTo sourceIndex targetIndex transformData
  |> _moveAllMapDataTo sourceIndex targetIndex;