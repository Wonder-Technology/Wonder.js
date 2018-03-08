open AmbientLightType;

open StateDataType;

let getBufferMaxCount = () => 3;

let getColorDataSize = () => 3;

let _getColorIndex = (index) => index * getColorDataSize();

let getColor = (index, typeArr) => TypeArrayUtils.getFloat3(_getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayUtils.setFloat3(_getColorIndex(index), color, typeArr);

let getDefaultColor = () => [|1., 1., 1.|];

let _setDefaultTypeArrData = (count: int, (buffer, colors)) => {
  let defaultColor = getDefaultColor();
  let rec _set = ((index, count, data), setFunc, typeArr) =>
    switch index {
    | index when index >= count => typeArr
    | index =>
      [@bs] setFunc(index, data, typeArr) |> _set((index + 1, count, data |> Obj.magic), setFunc)
    };
  (
    buffer,
    WonderCommonlib.ArraySystem.range(0, count - 1)
    |> WonderCommonlib.ArraySystem.reduceOneParam(
         [@bs] ((colors, index) => setColor(index, defaultColor, colors)),
         colors
       )
  )
};

let _initBufferData = () => {
  open Js.Typed_array;
  let count = getBufferMaxCount();
  let buffer = ArrayBuffer.make(count * Float32Array._BYTES_PER_ELEMENT * getColorDataSize());
  let offset = ref(0);
  let typeArrayLength = count * getColorDataSize();
  let colors = Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrayLength);
  offset := typeArrayLength * Float32Array._BYTES_PER_ELEMENT;
  (buffer, colors) |> _setDefaultTypeArrData(count)
};

let create = () => {
  let (buffer, colors) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    mappedIndexMap: WonderCommonlib.SparseMapSystem.createEmpty(),
    gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty()
  }
};