open StateDataMainType;

open DirectionLightType;

open Js.Typed_array;

open BufferDirectionLightService;

let getRecord = ({directionLightRecord}) =>
  directionLightRecord |> OptionService.unsafeGet;

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

let _initBufferData = count => {
  let buffer = createBuffer(count);
  let (colors, intensities) =
    CreateTypeArrayAllDirectionLightService.createTypeArrays(buffer, count);
  (buffer, colors, intensities) |> _setAllTypeArrDataToDefault(count);
};

let create = ({settingRecord} as state) => {
  let lightCount = BufferSettingService.getDirectionLightCount(settingRecord);
  let (buffer, (colors, intensities)) = _initBufferData(lightCount);

  {
    ...state,
    directionLightRecord:
      Some({
        index: 0,
        buffer,
        colors,
        intensities,
        disposedIndexArray: WonderCommonlib.ArrayService.createEmpty(),
        renderLightArr: WonderCommonlib.ArrayService.createEmpty(),
        gameObjectMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
      }),
  };
};

let deepCopyForRestore = state => {
  let {
        index,
        colors,
        intensities,
        gameObjectMap,
        disposedIndexArray,
        renderLightArr,
      } as directionLightRecord =
    getRecord(state);
  {
    ...state,
    directionLightRecord:
      Some({
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
        gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
        renderLightArr: renderLightArr |> Js.Array.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
      }),
  };
};