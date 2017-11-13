open GLSLLocationType;

let getAttribLocation = (program, name, attributeLocationMap, gl) =>
  switch (attributeLocationMap |> WonderCommonlib.HashMapSystem.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = Gl.getAttribLocation(program, name, gl);
    attributeLocationMap |> WonderCommonlib.HashMapSystem.set(name, pos) |> ignore;
    pos
  };

let getUniformLocation = (program, name, uniformLocationMap, gl) =>
  switch (uniformLocationMap |> WonderCommonlib.HashMapSystem.get(name)) {
  | Some(pos) => pos
  | None =>
    let pos = Gl.getUniformLocation(program, name, gl);
    uniformLocationMap |> WonderCommonlib.HashMapSystem.set(name, pos) |> ignore;
    pos
  };

let getAttributeLocationMap = (shaderIndexStr: string, state: StateDataType.state) =>
  state.glslLocationData.attributeLocationMap |> WonderCommonlib.HashMapSystem.get(shaderIndexStr);

let setAttributeLocationMap =
    (shaderIndexStr: string, attributeLocationMap: Js.Dict.t(int), state: StateDataType.state) => {
  state.glslLocationData.attributeLocationMap
  |> WonderCommonlib.HashMapSystem.set(shaderIndexStr, attributeLocationMap)
  |> ignore;
  state
};

let getUniformLocationMap = (shaderIndexStr: string, state: StateDataType.state) =>
  state.glslLocationData.uniformLocationMap |> WonderCommonlib.HashMapSystem.get(shaderIndexStr);

let setUniformLocationMap =
    (shaderIndexStr: string, uniformLocationMap, state: StateDataType.state) => {
  state.glslLocationData.uniformLocationMap
  |> WonderCommonlib.HashMapSystem.set(shaderIndexStr, uniformLocationMap)
  |> ignore;
  state
};

let createLocationMap = () => WonderCommonlib.HashMapSystem.createEmpty();

let initData = () => {
  attributeLocationMap: WonderCommonlib.HashMapSystem.createEmpty(),
  uniformLocationMap: WonderCommonlib.HashMapSystem.createEmpty()
};