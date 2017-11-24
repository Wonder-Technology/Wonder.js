open TransformOperateDataUtils;

open TypeArrayUtils;

let getMaxCount = (state: StateDataType.state) =>
  BufferConfigSystem.getConfig(state).transformDataBufferCount;

let _setDefaultTypeArrData = (count: int, (buffer, localToWorldMatrices, localPositions)) => {
  /* let defaultPositions = [|0., 0., 0.|]; */
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
  let rec _set = (index: int, data: array(float), setFunc, typeArr: Js.Typed_array.Float32Array.t) =>
    switch index {
    | index when index >= count => typeArr
    | index => [@bs] setFunc(index, data, typeArr) |> _set(index + 1, data, setFunc)
    };
  (
    buffer,
    localPositions,
    _set(0, defaultLocalToWorldMatrices, setLocalToWorldMatricesTypeArr, localToWorldMatrices)
  )
};

let initBufferData = (count: int) => {
  open Js.Typed_array;
  let size: int = Float32Array._BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize());
  let buffer = ArrayBuffer.make(count * size);
  let typeArrCount = ref(count * getMatrix4DataSize());
  let offset = ref(0);
  let localToWorldMatrices =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrCount^);
  offset := typeArrCount^ * Float32Array._BYTES_PER_ELEMENT;
  typeArrCount := count * getVector3DataSize();
  let localPositions =
    Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrCount^);
  offset := offset^ + typeArrCount^ * Float32Array._BYTES_PER_ELEMENT;
  /* todo set localRotations,localScales */
  (buffer, localToWorldMatrices, localPositions) |> _setDefaultTypeArrData(count)
};