open ShaderType;

open StateDataType;

let _getShaderData = (state: StateDataType.state) => state.shaderData;

let _genereateShaderIndex = (state: StateDataType.state) => {
  let shaderData = _getShaderData(state);
  let index = shaderData.index;
  shaderData.index = succ(index);
  (state, index)
};

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
  let (state, shaderIndex) = _genereateShaderIndex(state);
  let (vsSource, fsSource) = [@bs] buildGLSLSource(materialIndex, shaderLibDataArr, state);
  let program =
    gl
    |> ProgramSystem.createProgram
    |> ProgramSystem.registerProgram(shaderIndex, state)
    |> ProgramSystem.initShader(vsSource, fsSource, gl);
  state
  |> GLSLSenderConfigDataHandleSystem.addAttributeSendData(
       gl,
       shaderIndex,
       geometryIndex,
       program,
       shaderLibDataArr,
       attributeLocationMap
     )
  |> GLSLSenderConfigDataHandleSystem.addUniformSendData(
       gl,
       shaderIndex,
       geometryIndex,
       uid,
       program,
       shaderLibDataArr,
       uniformLocationMap
     )
  |> GLSLSenderConfigDataHandleSystem.addDrawPointsFunc(gl, shaderIndex, geometryIndex)
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

let initData = () => {index: 0, shaderLibNameMap: HashMapSystem.createEmpty()};