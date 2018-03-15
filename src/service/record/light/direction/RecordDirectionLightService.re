open DirectionLightType;

open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorDataSize = () => 3;

let getIntensityDataSize = () => 1;

let _getColorIndex = (index) => index * getColorDataSize();

let _getIntensityIndex = (index) => index * getIntensityDataSize();

let getColor = (index, typeArr) => TypeArrayService.getFloat3(_getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(_getColorIndex(index), color, typeArr);

let getIntensity = (index, typeArr) => Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setIntensity = (index, intensity, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, intensity);
  typeArr
};

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIntensity = () => 1.;

let _setDefaultTypeArrData = (count: int, (buffer, colors, intensities)) => {
  let defaultColor = getDefaultColor();
  let defaultIntensity = getDefaultIntensity();
  let rec _set = ((index, count, record), setFunc, typeArr) =>
    switch index {
    | index when index >= count => typeArr
    | index =>
      [@bs] setFunc(index, record, typeArr)
      |> _set((index + 1, count, record |> Obj.magic), setFunc)
    };
  (
    buffer,
    WonderCommonlib.ArrayService.range(0, count - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           ((colors, intensities), index) => (
             setColor(index, defaultColor, colors),
             setIntensity(index, defaultIntensity, intensities)
           )
         ),
         (colors, intensities)
       )
  )
};

let getColorsOffset = () => 0;

let getColorsLength = () => getBufferMaxCount() * getColorDataSize();

let getIntensitiesOffset = () => getColorsLength() * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = () => getBufferMaxCount() * getIntensityDataSize();

let _initBufferData = () => {
  let count = getBufferMaxCount();
  let buffer =
    ArrayBuffer.make(
      count * Float32Array._BYTES_PER_ELEMENT * (getColorDataSize() + getIntensityDataSize())
    );
  let colors =
    Float32Array.fromBufferRange(buffer, ~offset=getColorsOffset(), ~length=getColorsLength());
  let intensities =
    Float32Array.fromBufferRange(
      buffer,
      ~offset=getIntensitiesOffset(),
      ~length=getIntensitiesLength()
    );
  (buffer, colors, intensities) |> _setDefaultTypeArrData(count)
};

let create = () => {
  let (buffer, (colors, intensities)) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    intensities,
    mappedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
    gameObjectMap: WonderCommonlib.SparseMapService.createEmpty()
  }
};

let deepCopyForRestore = ({index, buffer, colors, intensities, gameObjectMap}) => {
  let copiedBuffer = CopyTypeArrayService.copyArrayBuffer(buffer);
  {
    index,
    buffer: copiedBuffer,
    colors:
      CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
        copiedBuffer,
        getColorsOffset(),
        getColorsLength()
      ),
    intensities:
      CopyTypeArrayService.copyFloat32TypeArrayFromBufferRange(
        copiedBuffer,
        getIntensitiesOffset(),
        getIntensitiesLength()
      ),
    mappedIndexMap: gameObjectMap |> SparseMapService.copy,
    gameObjectMap: gameObjectMap |> SparseMapService.copy
  }
};