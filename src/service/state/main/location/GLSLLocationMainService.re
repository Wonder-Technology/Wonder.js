open GLSLLocationType;

let _getLocation = ((program, name, locationMap), getGlLocationFunc, gl) =>
  switch (locationMap |> WonderCommonlib.HashMapService.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = [@bs] getGlLocationFunc(program, name, gl);
    locationMap |> WonderCommonlib.HashMapService.set(name, pos) |> ignore;
    pos
  };

let _getGlAttribLocation = [@bs] ((program, name, gl) => Gl.getAttribLocation(program, name, gl));

let _getGlUniformLocation =
  [@bs] ((program, name, gl) => Gl.getUniformLocation(program, name, gl));

let getAttribLocation = (program, name, attributeLocationMap, gl) =>
  _getLocation((program, name, attributeLocationMap), _getGlAttribLocation, gl);

let getUniformLocation = (program, name, uniformLocationMap, gl) =>
  _getLocation((program, name, uniformLocationMap), _getGlUniformLocation, gl);

let getAttributeLocationMap = (shaderIndex: int, state: MainStateDataType.state) =>
  state.glslLocationRecord.attributeLocationMap |> WonderCommonlib.SparseMapService.get(shaderIndex);

let setAttributeLocationMap = (shaderIndex: int, attributeLocationMap, state: MainStateDataType.state) => {
  state.glslLocationRecord.attributeLocationMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, attributeLocationMap)
  |> ignore;
  state
};

let getUniformLocationMap = (shaderIndex: int, state: MainStateDataType.state) =>
  state.glslLocationRecord.uniformLocationMap |> WonderCommonlib.SparseMapService.get(shaderIndex);

let setUniformLocationMap = (shaderIndex: int, uniformLocationMap, state: MainStateDataType.state) => {
  state.glslLocationRecord.uniformLocationMap
  |> WonderCommonlib.SparseMapService.set(shaderIndex, uniformLocationMap)
  |> ignore;
  state
};

let createLocationMap = () => WonderCommonlib.HashMapService.createEmpty();