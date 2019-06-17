open AllGLSLLocationType;

let _getLocationAndCache =
    ((program, name, locationMap), getGlLocationFunc, gl) =>
  switch (locationMap |> WonderCommonlib.MutableHashMapService.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = getGlLocationFunc(. program, name, gl);
    locationMap
    |> WonderCommonlib.MutableHashMapService.set(name, pos)
    |> ignore;
    pos;
  };

let _getGlAttribLocation =
  (. program, name, gl) =>
    WonderWebgl.Gl.getAttribLocation(program, name, gl);

let _getGlUniformLocation =
  (. program, name, gl) =>
    WonderWebgl.Gl.getUniformLocation(program, name, gl);

let getAttribLocationAndCache = (program, name, attributeLocationMap, gl) =>
  _getLocationAndCache(
    (program, name, attributeLocationMap),
    _getGlAttribLocation,
    gl,
  );

let getUniformLocationAndCache = (program, name, uniformLocationMap, gl) =>
  _getLocationAndCache(
    (program, name, uniformLocationMap),
    _getGlUniformLocation,
    gl,
  );

let getAttributeLocationMap = (shaderIndex: int, glslLocationRecord) =>
  glslLocationRecord.attributeLocationMap
  |> WonderCommonlib.MutableSparseMapService.get(shaderIndex);

let setAttributeLocationMap =
    (shaderIndex: int, attributeLocationMap, glslLocationRecord) => {
  glslLocationRecord.attributeLocationMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       attributeLocationMap,
     )
  |> ignore;
  glslLocationRecord;
};

let getUniformLocationMap = (shaderIndex: int, glslLocationRecord) =>
  glslLocationRecord.uniformLocationMap
  |> WonderCommonlib.MutableSparseMapService.get(shaderIndex);

let setUniformLocationMap =
    (shaderIndex: int, uniformLocationMap, glslLocationRecord) => {
  glslLocationRecord.uniformLocationMap
  |> WonderCommonlib.MutableSparseMapService.set(
       shaderIndex,
       uniformLocationMap,
     )
  |> ignore;

  glslLocationRecord;
};

let clearUniformLocationMap = (shaderIndex, glslLocationRecord) =>
  setUniformLocationMap(
    shaderIndex,
    WonderCommonlib.MutableHashMapService.createEmpty(),
    glslLocationRecord,
  );

let createLocationMap = () =>
  WonderCommonlib.MutableHashMapService.createEmpty();

let isAttributeLocationExist = pos => pos !== (-1);

let isUniformLocationExist = pos => Obj.magic(pos) !== Js.Nullable.null;