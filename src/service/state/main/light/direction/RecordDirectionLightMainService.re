open StateDataMainType;

open DirectionLightType;

open Js.Typed_array;

open BufferDirectionLightService;

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIntensity = () => 1.;

let getColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), color, typeArr);

let getIntensity = (index, typeArr) =>
  TypeArrayService.getFloat1(getIntensityIndex(index), typeArr);

let setIntensity = (index, intensity, typeArr) =>
  TypeArrayService.setFloat1(getIntensityIndex(index), intensity, typeArr);

let setAllTypeArrDataToDefault = (count: int, (colors, intensities)) => {
  let defaultColor = getDefaultColor();
  let defaultIntensity = getDefaultIntensity();
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (colors, intensities), index) => (
         setColor(index, defaultColor, colors),
         setIntensity(index, defaultIntensity, intensities),
       ),
       (colors, intensities),
     );
};

let _setAllTypeArrDataToDefault = (count: int, (buffer, colors, intensities)) => {
  let defaultColor = getDefaultColor();
  let defaultIntensity = getDefaultIntensity();
  (buffer, setAllTypeArrDataToDefault(count, (colors, intensities)));
};

let _initBufferData = () => {
  let count = getBufferMaxCount();
  let buffer = createBuffer(count);
  let (colors, intensities) =
    CreateTypeArrayDirectionLightService.createTypeArrays(buffer, count);
  (buffer, colors, intensities) |> _setAllTypeArrDataToDefault(count);
};

let create = () => {
  let (buffer, (colors, intensities)) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    intensities,
    disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
    renderLightArr: WonderCommonlib.ArrayService.createEmpty(),
    gameObjectMap: WonderCommonlib.SparseMapService.createEmpty(),
  };
};

let deepCopyForRestore = ({directionLightRecord} as state) => {
  let {
    index,
    colors,
    intensities,
    gameObjectMap,
    disposedIndexArray,
    renderLightArr,
  } = directionLightRecord;
  {
    ...state,
    directionLightRecord: {
      ...directionLightRecord,
      index,
      colors:
        colors
        |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
             index * getColorsSize(),
           ),
      intensities:
        intensities
        |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
             index * getIntensitiesSize(),
           ),
      gameObjectMap: gameObjectMap |> SparseMapService.copy,
      renderLightArr: renderLightArr |> Js.Array.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy,
    },
  };
};