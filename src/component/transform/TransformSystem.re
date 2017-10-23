open OperateDataSystem;

open TransformType;

open TypeArrayUtils;

open StateDataType;

open Contract;

open DirtySystem;

let _getTransformData (state: StateDataType.state) => state.transformData;

let create (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  let index = transformData.index;
  transformData.index = succ transformData.index;
  transformData.count = succ transformData.count;
  (state, index)
  |> ensureCheck (
       fun (state, index) => {
         open Contract.Operators;
         let {index, count} = _getTransformData state;
         let maxCount = getMaxCount ();
         test "index should <= maxCount" (fun () => index <= maxCount);
         test "count should <= maxCount" (fun () => count <= maxCount)
       }
     )
};

let _setDefaultTypeArrData (count: int) (buffer, localToWorldMatrices, localPositions) => {
  let defaultPositions = [|0., 0., 0.|];
  let defaultLocalToWorldMatrices = [|
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.
  |];
  let rec _set
          (index: int)
          (increase: int)
          (data: array float)
          setFunc
          (typeArr: Js.Typed_array.Float32Array.t) =>
    if (index >= count) {
      typeArr
    } else {
      setFunc index data typeArr [@bs] |> _set (index + increase) increase data setFunc
    };
  (
    buffer,
    _set 0 (getVector3DataSize ()) defaultPositions setLocalPositionTypeArr localPositions,
    _set
      0
      (getMatrix4DataSize ())
      defaultLocalToWorldMatrices
      setLocalToWorldMatricesTypeArr
      localToWorldMatrices
  )
};

let _initBufferData () => {
  open Js.Typed_array;
  let count = getMaxCount ();
  let size: int =
    Float32Array._BYTES_PER_ELEMENT * (getMatrix4DataSize () + getVector3DataSize ());
  let buffer = ArrayBuffer.make (count * size);
  let typeArrCount = ref (count * getMatrix4DataSize ());
  let offset = ref 0;
  let localToWorldMatrices =
    Float32Array.fromBufferRange buffer offset::!offset length::!typeArrCount;
  offset := !typeArrCount * Float32Array._BYTES_PER_ELEMENT;
  typeArrCount := count * getVector3DataSize ();
  let localPositions = Float32Array.fromBufferRange buffer offset::!offset length::!typeArrCount;
  offset := !offset + !typeArrCount * Float32Array._BYTES_PER_ELEMENT;
  /* todo set localRotations,localScales */
  (buffer, localToWorldMatrices, localPositions) |> _setDefaultTypeArrData count
};

let _setDefaultChildren ({count, childMap} as transformData) => {
  for index in 0 to (count - 1) {
    HashMapSystem.set (Js.Int.toString index) (ArraySystem.createEmpty ()) childMap |> ignore
  };
  transformData
};

let setParent (parent: Js.nullable transform) (child: transform) (state: StateDataType.state) => {
  HierachySystem.setParent (Js.toOption parent) child (_getTransformData state) |> ignore;
  state
};

let update (elapsed: float) (state: StateDataType.state) => {
  UpdateSystem.update elapsed state.tempData (_getTransformData state) |> ignore;
  state
};

let getLocalPosition (transform: transform) (state: StateDataType.state) =>
  getFloat3
    (getVector3DataIndex transform)
    (_getTransformData state).localPositions
    (ArraySystem.createEmpty ());

let setLocalPosition
    (transform: transform)
    (localPosition: ArraySystem.t float)
    (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  /* todo check alive? */
  setFloat3 (getVector3DataIndex transform) localPosition transformData.localPositions |> ignore;
  addItAndItsChildrenToDirtyList transform transformData |> ignore;
  state
};

let initData () => {
  let (buffer, localToWorldMatrices, localPositions) = _initBufferData ();
  {
    buffer,
    localToWorldMatrices,
    localPositions,
    index: 0,
    count: 0,
    firstDirtyIndex: getMaxCount (),
    oldIndexListBeforeAddToDirtyList: ArraySystem.createEmpty (),
    parentMap: HashMapSystem.createEmpty (),
    childMap: HashMapSystem.createEmpty ()
  }
  |> _setDefaultChildren
};