open Js.Typed_array;

open Contract;

open StateDataType;

open TypeArrayUtils;

open TransformType;

let getMaxCount () => DataBufferConfig.dataBufferConfig.transformDataBufferCount;

let getMatrix4DataIndex (index: int) => index * getMatrix4DataSize ();

let getVector3DataIndex (index: int) => index * getVector3DataSize ();


let setLocalPositionTypeArr =
  (
    fun (index: int) (position: ArraySystem.t float) (localPositions: Float32Array.t) =>
      setFloat3 index position localPositions
  )
  [@bs];

let setLocalToWorldMatricesTypeArr =
  (
    fun (index: int) (mat: ArraySystem.t float) (localToWorldMatrices: Float32Array.t) =>
      setFloat16 index mat localToWorldMatrices
  )
  [@bs];

let getLocalToWorldMatrix (index: int) localToWorldMatrices =>
  getFloat16 index localToWorldMatrices;

let setPosition
    (localToWorldMatricesIndex: int)
    (localPositionsIndex: int)
    (parent: option transform)
    (position: position)
    ({localToWorldMatrices, localPositions} as transformData) =>
  switch parent {
  | None => setFloat3 localPositionsIndex (CastTypeUtils.tupleToJsArray position) localPositions
  | Some parent =>
    setFloat3
      localPositionsIndex
      (
        Vector3System.transformMat4
          position
          (getLocalToWorldMatrix (getMatrix4DataIndex parent) localToWorldMatrices)
          (ArraySystem.createEmpty ())
      )
      localPositions
  };
let _isIndexUsed (index: int) (transformData: transformData) => {
  open Js.Option;
  let indexStr = Js.Int.toString index;
  /* isSome (HashMapSystem.get transformData.parentMap indexStr)
     || ArraySystem.length (HashMapSystem.unsafeGet transformData.childMap indexStr)
     > 0
     || Float32Array.unsafe_get transformData.localPositions (getVector3DataIndex index)
     != 0. */
  HashMapSystem.get transformData.gameObjectMap indexStr |> Js.Option.isSome
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
    (Js.Int.toString targetIndex) (HashMapSystem.unsafeGet map (Js.Int.toString sourceIndex)) map;

let _moveAllMapDataTo
    (sourceIndex: int)
    (targetIndex: int)
    ({parentMap, childMap, gameObjectMap} as transformData) => {
  _moveMapDataTo sourceIndex targetIndex parentMap |> ignore;
  _moveMapDataTo sourceIndex targetIndex childMap |> ignore;
  _moveMapDataTo sourceIndex targetIndex gameObjectMap |> ignore;
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

let _swapTypeArrData (sourceIndex: int) (targetIndex: int) (length: int) (typeArr: Float32Array.t) =>
  for i in 0 to (length - 1) {
    let sIndex = sourceIndex + i;
    let tIndex = targetIndex + i;
    let sourceVal = Float32Array.unsafe_get typeArr sIndex;
    let targetVal = Float32Array.unsafe_get typeArr tIndex;
    Float32Array.unsafe_set typeArr sIndex targetVal;
    Float32Array.unsafe_set typeArr tIndex sourceVal
  };

let _swapAllTypeArrData
    (sourceIndex: int)
    (targetIndex: int)
    ({localToWorldMatrices, localPositions} as transformData) => {
  _swapTypeArrData
    (getMatrix4DataIndex sourceIndex)
    (getMatrix4DataIndex targetIndex)
    (getMatrix4DataSize ())
    localToWorldMatrices
  |> ignore;
  _swapTypeArrData
    (getVector3DataIndex sourceIndex)
    (getVector3DataIndex targetIndex)
    (getVector3DataSize ())
    localPositions
  |> ignore;
  transformData
};

let _swapMapData (sourceIndex: int) (targetIndex: int) (map: HashMapSystem.t 'a) => {
  let sIndexStr = Js.Int.toString sourceIndex;
  let tIndexStr = Js.Int.toString targetIndex;
  let sourceVal = HashMapSystem.unsafeGet map sIndexStr;
  let targetVal = HashMapSystem.unsafeGet map tIndexStr;
  map |> HashMapSystem.set sIndexStr targetVal |> HashMapSystem.set tIndexStr sourceVal
};

let _swapAllMapData
    (sourceIndex: int)
    (targetIndex: int)
    ({parentMap, childMap, gameObjectMap} as transformData) => {
  _swapMapData sourceIndex targetIndex parentMap |> ignore;
  _swapMapData sourceIndex targetIndex childMap |> ignore;
  _swapMapData sourceIndex targetIndex gameObjectMap |> ignore;
  transformData
};

let swap (sourceIndex: int) (targetIndex: int) (transformData: transformData) => {
  requireCheck (
    fun () => {
      test
        "sourceIndex should be used"
        (fun () => _isIndexUsed sourceIndex transformData |> assertTrue);
      test
        "targetIndex should be used"
        (fun () => _isIndexUsed targetIndex transformData |> assertTrue)
    }
  );
  _swapAllTypeArrData sourceIndex targetIndex transformData
  |> _swapAllMapData sourceIndex targetIndex
};