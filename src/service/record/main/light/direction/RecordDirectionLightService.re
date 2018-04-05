open DirectionLightType;

open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorsSize = () => 3;

let getIntensitiesSize = () => 1;

let _getColorIndex = (index) => index * getColorsSize();

let _getIntensityIndex = (index) => index * getIntensitiesSize();

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

let getColorsLength = () => getBufferMaxCount() * getColorsSize();

let getIntensitiesOffset = () => getColorsLength() * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = () => getBufferMaxCount() * getIntensitiesSize();

let _initBufferData = () => {
  let count = getBufferMaxCount();
  let buffer =
    ArrayBuffer.make(
      count * Float32Array._BYTES_PER_ELEMENT * (getColorsSize() + getIntensitiesSize())
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

let deepCopyForRestore = ({index, buffer, colors, intensities, gameObjectMap, mappedIndexMap}) => {
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
    mappedIndexMap: mappedIndexMap |> SparseMapService.copy,
    gameObjectMap: gameObjectMap |> SparseMapService.copy
  }
};