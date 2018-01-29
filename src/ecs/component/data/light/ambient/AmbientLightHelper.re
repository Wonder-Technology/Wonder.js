open AmbientLightType;

open StateDataType;

let getBufferMaxCount = () => 1;

let getColorDataSize = () => 3;

let getIsDirtyDataSize = () => 1;

let _getColorIndex = (index) => index * getColorDataSize();

let _getIsDirtyIndex = (index) => index * getIsDirtyDataSize();

let getColor = (index, typeArr) => TypeArrayUtils.getFloat3(_getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayUtils.setFloat3(_getColorIndex(index), color, typeArr);

let getIsDirty = (index, typeArr) =>
  Js.Typed_array.Uint8Array.unsafe_get(typeArr, _getIsDirtyIndex(index));

let setIsDirty = (index, isDirty, typeArr) => {
  Js.Typed_array.Uint8Array.unsafe_set(typeArr, _getIsDirtyIndex(index), isDirty);
  typeArr
};

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIsColorDirty = () => 1;

let _setDefaultTypeArrData = (count: int, (buffer, (colors, isColorDirtys))) => {
  let defaultColor = getDefaultColor();
  let defaultIsColorDirty = getDefaultIsColorDirty();
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
         [@bs]
         (
           ((colors, isColorDirtys), index) => (
             setColor(index, defaultColor, colors),
             setIsDirty(index, defaultIsColorDirty, isColorDirtys)
           )
         ),
         (colors, isColorDirtys)
       )
  )
};

let _initBufferData = () => {
  open Js.Typed_array;
  let count = getBufferMaxCount();
  let buffer =
    ArrayBuffer.make(
      count * Float32Array._BYTES_PER_ELEMENT * (getColorDataSize() + getIsDirtyDataSize())
    );
  let offset = ref(0);
  let typeArrayLength = count * getColorDataSize();
  let colors = Float32Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrayLength);
  offset := typeArrayLength * Float32Array._BYTES_PER_ELEMENT;
  let typeArrayLength = count * getIsDirtyDataSize();
  let isColorDirtys = Uint8Array.fromBufferRange(buffer, ~offset=offset^, ~length=typeArrayLength);
  (buffer, (colors, isColorDirtys)) |> _setDefaultTypeArrData(count)
};

let initData = () => {
  let (buffer, (colors, isColorDirtys)) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    isColorDirtys,
    gameObjectMap: WonderCommonlib.SparseMapSystem.createEmpty()
  }
};