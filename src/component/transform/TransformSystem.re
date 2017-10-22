open OperateDataSystem;

open TypeArrayUtils;

open StateDataType;

open Contract;

let _getTransformData (state: StateDataType.state) => state.transformData;

let _getMaxCount () => DataBufferConfig.dataBufferConfig.transformDataBufferCount;

let create (state: StateDataType.state) => {
  let transformData = _getTransformData state;
  let index = transformData.index;
  transformData.index = transformData.index + 1;
  transformData.count = transformData.count + 1;
  (state, index)
  |> ensureCheck (
       fun (state, index) => {
         open Contract.Operators;
         let {index, count} = _getTransformData state;
         let maxCount = _getMaxCount ();
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
      setFunc index data typeArr |> _set (index + increase) increase data setFunc
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
  let count = _getMaxCount ();
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
    HashMapSystem.set childMap (Js.Int.toString index) [||]
  };
  transformData
};

let initData () => {
  let (buffer, localToWorldMatrices, localPositions) = _initBufferData ();
  {
    buffer,
    localToWorldMatrices,
    localPositions,
    index: 0,
    count: 0,
    /* firstDirtyIndex: _getMaxCount (), */
    parentMap: HashMapSystem.createEmpty (),
    childMap: HashMapSystem.createEmpty ()
  }
  |> _setDefaultChildren
};