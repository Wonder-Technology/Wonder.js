open StateDataMainType;

open PointLightType;

open Js.Typed_array;

open BufferPointLightService;

/*

 let _getIntensityIndex = (index) => index * getIntensitiesSize();

 let _getConstantIndex = (index) => index * getConstantsSize();

 let _getLinearIndex = (index) => index * getLinearsSize();

 let _getQuadraticIndex = (index) => index * getQuadraticsSize();

 let _getRangeIndex = (index) => index * getRangesSize(); */

let getRecord = ({pointLightRecord}) =>
  pointLightRecord |> OptionService.unsafeGet;

let getColor = (index, typeArr) =>
  TypeArrayService.getFloat3(getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(getColorIndex(index), color, typeArr);

let getIntensity = (index, typeArr) =>
  Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setIntensity = (index, intensity, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, intensity);
  typeArr;
};

let getConstant = (index, typeArr) =>
  Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setConstant = (index, constant, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, constant);
  typeArr;
};

let getLinear = (index, typeArr) =>
  Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setLinear = (index, linear, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, linear);
  typeArr;
};

let getQuadratic = (index, typeArr) =>
  Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setQuadratic = (index, quadratic, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, quadratic);
  typeArr;
};

let getRange = (index, typeArr) =>
  Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setRange = (index, range, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, range);
  typeArr;
};

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIntensity = () => 1.;

let getDefaultConstant = () => 1.;

let getDefaultLinear = () => 0.07;

let getDefaultQuadratic = () => 0.017;

let getDefaultRange = () => 65.;

let setAllTypeArrDataToDefault =
    (
      count: int,
      (colors, intensities, constants, linears, quadratics, ranges),
    ) => {
  let defaultColor = getDefaultColor();
  let defaultIntensity = getDefaultIntensity();
  let defaultConstant = getDefaultConstant();
  let defaultLinear = getDefaultLinear();
  let defaultQuadratic = getDefaultQuadratic();
  let defaultRange = getDefaultRange();
  WonderCommonlib.ArrayService.range(0, count - 1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         (colors, intensities, constants, linears, quadratics, ranges),
         index,
       ) => (
         setColor(index, defaultColor, colors),
         setIntensity(index, defaultIntensity, intensities),
         setConstant(index, defaultConstant, constants),
         setLinear(index, defaultLinear, linears),
         setQuadratic(index, defaultQuadratic, quadratics),
         setRange(index, defaultRange, ranges),
       ),
       (colors, intensities, constants, linears, quadratics, ranges),
     );
};

let _setAllTypeArrDataToDefault =
    (
      count: int,
      (buffer, colors, intensities, constants, linears, quadratics, ranges),
    ) => (
  buffer,
  setAllTypeArrDataToDefault(
    count,
    (colors, intensities, constants, linears, quadratics, ranges),
  ),
);

let _initBufferData = count => {
  let buffer = createBuffer(count);
  let (colors, intensities, constants, linears, quadratics, ranges) =
    CreateTypeArrayAllPointLightService.createTypeArrays(buffer, count);
  (buffer, colors, intensities, constants, linears, quadratics, ranges)
  |> _setAllTypeArrDataToDefault(count);
};

let create = ({settingRecord} as state) => {
  let lightCount = BufferSettingService.getPointLightCount(settingRecord);
  let (buffer, (colors, intensities, constants, linears, quadratics, ranges)) =
    _initBufferData(lightCount);

  {
    ...state,
    pointLightRecord:
      Some({
        index: 0,
        buffer,
        colors,
        intensities,
        constants,
        linears,
        quadratics,
        ranges,
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
        constants,
        linears,
        quadratics,
        ranges,
        gameObjectMap,
        disposedIndexArray,
        renderLightArr,
      } as pointLightRecord =
    getRecord(state);
  {
    ...state,
    pointLightRecord:
      Some({
        ...pointLightRecord,
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
        constants:
          constants
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getConstantsSize(),
             ),
        linears:
          linears
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getLinearsSize(),
             ),
        quadratics:
          quadratics
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getQuadraticsSize(),
             ),
        ranges:
          ranges
          |> CopyTypeArrayService.copyFloat32ArrayWithEndIndex(
               index * getRangesSize(),
             ),
        gameObjectMap: gameObjectMap |> WonderCommonlib.MutableSparseMapService.copy,
        renderLightArr: renderLightArr |> Js.Array.copy,
        disposedIndexArray: disposedIndexArray |> Js.Array.copy,
      }),
  };
};