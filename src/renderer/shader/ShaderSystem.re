open ShaderType;

open StateDataType;

open RenderConfigDataType;

let getAllShaderIndexArray = (state: StateDataType.state) =>
  ArraySystem.range(0, ShaderStateCommon.getShaderData(state).index - 1);

let _genereateShaderIndex = (state: StateDataType.state) => {
  let shaderData = ShaderStateCommon.getShaderData(state);
  let index = shaderData.index;
  shaderData.index = succ(index);
  (state, index)
};

let _getShaderIndex = (key: string, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapSystem.get(key);

let _setShaderIndex = (key: string, shaderIndex: int, {shaderIndexMap}) =>
  shaderIndexMap |> WonderCommonlib.HashMapSystem.set(key, shaderIndex);

let _join = (array: array(shaderLib)) => {
  let output = ref("");
  for (i in 0 to Js.Array.length(array) |> pred) {
    output := output^ ++ array[i].name
  };
  output^
};

let _buildShaderIndexMapKey = (shaderLibDataArr: shader_libs) => shaderLibDataArr |> _join;

let getPrecisionSource = (state: StateDataType.state) =>
  ShaderSourceBuildCommon.getPrecisionSource(state);

let initMaterialShader =
    (materialIndex: int, (gl, shaderLibDataArr), buildGLSLSource, state: StateDataType.state) => {
  let shaderData = ShaderStateCommon.getShaderData(state);
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
    state
    |> GLSLSenderConfigDataHandleSystem.addAttributeSendData(
         (gl, shaderIndex, program),
         shaderLibDataArr
       )
    |> GLSLSenderConfigDataHandleSystem.addUniformSendData(
         gl,
         (program, shaderIndex, shaderLibDataArr)
       )
    |> ignore;
    shaderIndex
  | Some(shaderIndex) => shaderIndex
  }
};

let getIntersectShaderIndexDataArray = ShaderStateCommon.getIntersectShaderIndexDataArray;

let deepCopyForRestore = ShaderStateCommon.deepCopyForRestore;

let restore = ShaderStateCommon.restore;