open ShaderType;

open StateDataType;

let _getShaderData = (state: StateDataType.state) => state.shaderData;

let _genereateShaderIndex = (state: StateDataType.state) => {
  let shaderData = _getShaderData(state);
  let index = shaderData.index;
  shaderData.index = succ(index);
  (state, index)
};

let _getShaderIndex = (key: string, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapSystem.get(key);

let _setShaderIndex = (key: string, shaderIndex: int, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapSystem.set(key, shaderIndex);

let _join = (array) => {
  let output = ref("");
  for (i in 0 to Js.Array.length(array) |> pred) {
    output := output^ ++ array[i].name
  };
  output^
};

let _buildShaderIndexMapKey = (shaderLibDataArr: shader_libs) => shaderLibDataArr |> _join;

let _init =
    (
      gl,
      materialIndex: int,
      shaderLibDataArr: shader_libs,
      buildGLSLSource,
      state: StateDataType.state
    ) => {
  let shaderData = _getShaderData(state);
  let key = _buildShaderIndexMapKey(shaderLibDataArr);
  switch (_getShaderIndex(key, shaderData)) {
  | None =>
    let (state, shaderIndex) = _genereateShaderIndex(state);
    _setShaderIndex(key, shaderIndex, shaderData) |> ignore;
    let (vsSource, fsSource) = [@bs] buildGLSLSource(materialIndex, shaderLibDataArr, state);
    let program =
      gl
      |> ProgramSystem.createProgram
      |> ProgramSystem.registerProgram(shaderIndex, state)
      |> ProgramSystem.initShader(vsSource, fsSource, gl);
    let shaderIndex = shaderIndex;
    state
    |> GLSLSenderConfigDataHandleSystem.addAttributeSendData(
         gl,
         shaderIndex,
         program,
         shaderLibDataArr
       )
    |> GLSLSenderConfigDataHandleSystem.addUniformSendData(
         gl,
         shaderIndex,
         program,
         shaderLibDataArr
       )
    |> ignore;
    shaderIndex
  | Some(shaderIndex) => shaderIndex
  }
};

let initMaterialShader =
    (gl, materialIndex: int, shaderLibDataArr, initShaderFuncTuple, state: StateDataType.state) =>
  _init(gl, materialIndex, shaderLibDataArr, initShaderFuncTuple, state);

let initData = () => {index: 0, shaderIndexMap: WonderCommonlib.HashMapSystem.createEmpty()};