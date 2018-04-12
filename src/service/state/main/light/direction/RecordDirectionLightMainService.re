open StateDataMainType;

open DirectionLightType;

open Js.Typed_array;

open BufferDirectionLightService;

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIntensity = () => 1.;

let getColor = (index, typeArr) => TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), color, typeArr);

let getIntensity = (index, typeArr) =>
  TypeArrayService.getFloat1(getIntensityIndex(index), typeArr);

let setIntensity = (index, intensity, typeArr) =>
  TypeArrayService.setFloat1(getIntensityIndex(index), intensity, typeArr);

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

let _initBufferData = () => {
  let count = getBufferMaxCount();
  let buffer = createBuffer(count);
  let colors =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getColorsOffset(),
      ~length=getColorsLength()
    );
  let intensities =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
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

let deepCopyForRestore = ({directionLightRecord} as state) => {
  let {index, buffer, colors, intensities, gameObjectMap, mappedIndexMap} = directionLightRecord;
  {
    ...state,
    directionLightRecord: {
      ...directionLightRecord,
      index,
      buffer:
        CopyArrayBufferService.copyArrayBuffer(
          buffer,
          BufferDirectionLightService.getTotalByteLength(index)
        ),
      mappedIndexMap: mappedIndexMap |> SparseMapService.copy,
      gameObjectMap: gameObjectMap |> SparseMapService.copy
    }
  }
};