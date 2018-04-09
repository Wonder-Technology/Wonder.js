open PointLightType;

open Js.Typed_array;

let getBufferMaxCount = () => 4;

let getColorsSize = () => 3;

let getIntensitiesSize = () => 1;

let getConstantsSize = () => 1;

let getLinearsSize = () => 1;

let getQuadraticsSize = () => 1;

let getRangesSize = () => 1;

let _getColorIndex = (index) => index * getColorsSize();

/*

 let _getIntensityIndex = (index) => index * getIntensitiesSize();

 let _getConstantIndex = (index) => index * getConstantsSize();

 let _getLinearIndex = (index) => index * getLinearsSize();

 let _getQuadraticIndex = (index) => index * getQuadraticsSize();

 let _getRangeIndex = (index) => index * getRangesSize(); */
let getColor = (index, typeArr) => TypeArrayService.getFloat3(_getColorIndex(index), typeArr);

let setColor = (index, color, typeArr) =>
  TypeArrayService.setFloat3(_getColorIndex(index), color, typeArr);

let getIntensity = (index, typeArr) => Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setIntensity = (index, intensity, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, intensity);
  typeArr
};

let getConstant = (index, typeArr) => Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setConstant = (index, constant, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, constant);
  typeArr
};

let getLinear = (index, typeArr) => Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setLinear = (index, linear, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, linear);
  typeArr
};

let getQuadratic = (index, typeArr) => Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setQuadratic = (index, quadratic, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, quadratic);
  typeArr
};

let getRange = (index, typeArr) => Js.Typed_array.Float32Array.unsafe_get(typeArr, index);

let setRange = (index, range, typeArr) => {
  Js.Typed_array.Float32Array.unsafe_set(typeArr, index, range);
  typeArr
};

let getDefaultColor = () => [|1., 1., 1.|];

let getDefaultIntensity = () => 1.;

let getDefaultConstant = () => 1.;

let getDefaultLinear = () => 0.07;

let getDefaultQuadratic = () => 0.017;

let getDefaultRange = () => 65.;

let _setDefaultTypeArrData =
    (count: int, (buffer, colors, intensities, constants, linears, quadratics, ranges)) => {
  let defaultColor = getDefaultColor();
  let defaultIntensity = getDefaultIntensity();
  let defaultConstant = getDefaultConstant();
  let defaultLinear = getDefaultLinear();
  let defaultQuadratic = getDefaultQuadratic();
  let defaultRange = getDefaultRange();
  (
    buffer,
    WonderCommonlib.ArrayService.range(0, count - 1)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         [@bs]
         (
           ((colors, intensities, constants, linears, quadratics, ranges), index) => (
             setColor(index, defaultColor, colors),
             setIntensity(index, defaultIntensity, intensities),
             setConstant(index, defaultConstant, constants),
             setLinear(index, defaultLinear, linears),
             setQuadratic(index, defaultQuadratic, quadratics),
             setRange(index, defaultRange, ranges)
           )
         ),
         (colors, intensities, constants, linears, quadratics, ranges)
       )
  )
};

let getColorsOffset = () => 0;

let getColorsLength = () => getBufferMaxCount() * getColorsSize();

let getIntensitiesOffset = () => getColorsLength() * Float32Array._BYTES_PER_ELEMENT;

let getIntensitiesLength = () => getBufferMaxCount() * getIntensitiesSize();

let getConstantsOffset = () =>
  getIntensitiesOffset() + getIntensitiesLength() * Float32Array._BYTES_PER_ELEMENT;

let getConstantsLength = () => getBufferMaxCount() * getConstantsSize();

let getLinearsOffset = () =>
  getConstantsOffset() + getConstantsLength() * Float32Array._BYTES_PER_ELEMENT;

let getLinearsLength = () => getBufferMaxCount() * getLinearsSize();

let getQuadraticsOffset = () =>
  getLinearsOffset() + getLinearsLength() * Float32Array._BYTES_PER_ELEMENT;

let getQuadraticsLength = () => getBufferMaxCount() * getQuadraticsSize();

let getRangesOffset = () =>
  getQuadraticsOffset() + getQuadraticsLength() * Float32Array._BYTES_PER_ELEMENT;

let getRangesLength = () => getBufferMaxCount() * getRangesSize();

let _initBufferData = () => {
  let count = getBufferMaxCount();
  let buffer =
    Worker.newSharedArrayBuffer(
      count
      * Float32Array._BYTES_PER_ELEMENT
      * (
        getColorsSize()
        + getIntensitiesSize()
        + getConstantsSize()
        + getLinearsSize()
        + getQuadraticsSize()
        + getRangesSize()
      )
    );
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
  let constants =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getConstantsOffset(),
      ~length=getConstantsLength()
    );
  let linears =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getLinearsOffset(),
      ~length=getLinearsLength()
    );
  let quadratics =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getQuadraticsOffset(),
      ~length=getQuadraticsLength()
    );
  let ranges =
    Float32Array.fromBufferRange(
      Worker.sharedArrayBufferToArrayBuffer(buffer),
      ~offset=getRangesOffset(),
      ~length=getRangesLength()
    );
  (buffer, colors, intensities, constants, linears, quadratics, ranges)
  |> _setDefaultTypeArrData(count)
};

let create = () => {
  let (buffer, (colors, intensities, constants, linears, quadratics, ranges)) = _initBufferData();
  {
    index: 0,
    buffer,
    colors,
    intensities,
    constants,
    linears,
    quadratics,
    ranges,
    mappedIndexMap: WonderCommonlib.SparseMapService.createEmpty(),
    gameObjectMap: WonderCommonlib.SparseMapService.createEmpty()
  }
};

let deepCopyForRestore =
    (
      {
        index,
        buffer,
        colors,
        intensities,
        constants,
        linears,
        quadratics,
        ranges,
        gameObjectMap,
        mappedIndexMap
      }
    ) => {
  let copiedBuffer = CopyTypeArrayService.copySharedArrayBuffer(buffer);
  {
    index,
    buffer: copiedBuffer,
    colors:
      CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
        copiedBuffer,
        getColorsOffset(),
        getColorsLength()
      ),
    intensities:
      CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
        copiedBuffer,
        getIntensitiesOffset(),
        getIntensitiesLength()
      ),
    constants:
      CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
        copiedBuffer,
        getConstantsOffset(),
        getConstantsLength()
      ),
    linears:
      CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
        copiedBuffer,
        getLinearsOffset(),
        getLinearsLength()
      ),
    quadratics:
      CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
        copiedBuffer,
        getQuadraticsOffset(),
        getQuadraticsLength()
      ),
    ranges:
      CopyTypeArrayService.copyFloat32TypeArrayFromSharedArrayBufferRange(
        copiedBuffer,
        getRangesOffset(),
        getRangesLength()
      ),
    mappedIndexMap: mappedIndexMap |> SparseMapService.copy,
    gameObjectMap: gameObjectMap |> SparseMapService.copy
  }
};