open ShaderType;

open StateDataType;

let _getShaderData = (state: StateDataType.state) => state.shaderData;

let _genereateShaderIndex = (state: StateDataType.state) => {
  let shaderData = _getShaderData(state);
  let index = shaderData.index;
  shaderData.index = succ(index);
  (state, index)
};

let _getShaderIndex = (key: string, {shaderIndexMap}) => shaderIndexMap |> WonderCommonlib.HashMapSystem.get(key);

let _setShaderIndex = (key: string, shaderIndex: int, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapSystem.set(key, shaderIndex);

let _buildShaderIndexMapKey = (shaderLibDataArr: shader_libs) =>
  shaderLibDataArr |> Js.Array.joinWith("");

let _init =
    (
      gl,
      materialIndex: int,
      geometryIndex: int,
      uid: string,
      shaderLibDataArr: shader_libs,
      attributeLocationMap,
      uniformLocationMap,
      buildGLSLSource,
      state: StateDataType.state
    ) => {
  let shaderData = _getShaderData(state);
  let materialIndexStr = Js.Int.toString(materialIndex);
  let key = _buildShaderIndexMapKey(shaderLibDataArr);
  let (shaderIndex, program) =
    switch (_getShaderIndex(key, shaderData)) {
    | None =>
      let (state, shaderIndex) = _genereateShaderIndex(state);
      _setShaderIndex(key, shaderIndex, shaderData) |> ignore;
      let (vsSource, fsSource) = [@bs] buildGLSLSource(materialIndex, shaderLibDataArr, state);
      (
        shaderIndex,
        gl
        |> ProgramSystem.createProgram
        |> ProgramSystem.registerProgram(shaderIndex, state)
        |> ProgramSystem.initShader(vsSource, fsSource, gl)
      )
    | Some(shaderIndex) => (
        shaderIndex,
        Js.Option.getExn(ProgramSystem.getProgram(Js.Int.toString(shaderIndex), state))
      )
    };
  state
  |> GLSLSenderConfigDataHandleSystem.addAttributeSendData(
       gl,
       materialIndexStr,
       shaderIndex,
       geometryIndex,
       program,
       shaderLibDataArr,
       attributeLocationMap
     )
  |> GLSLSenderConfigDataHandleSystem.addUniformSendData(
       gl,
       materialIndexStr,
       shaderIndex,
       geometryIndex,
       uid,
       program,
       shaderLibDataArr,
       uniformLocationMap
     )
  |> GLSLSenderConfigDataHandleSystem.addDrawPointsFunc(gl, materialIndexStr, geometryIndex)
  |> ignore;
  shaderIndex
};

let initMaterialShader =
    (
      gl,
      materialIndex: int,
      geometryIndex: int,
      uid: string,
      shaderLibDataArr,
      attributeLocationMap,
      uniformLocationMap,
      initShaderFuncTuple,
      state: StateDataType.state
    ) =>
  _init(
    gl,
    materialIndex,
    geometryIndex,
    uid,
    shaderLibDataArr,
    attributeLocationMap,
    uniformLocationMap,
    initShaderFuncTuple,
    state
  );

let initData = () => {
  index: 0,
  shaderIndexMap: WonderCommonlib.HashMapSystem.createEmpty()
};