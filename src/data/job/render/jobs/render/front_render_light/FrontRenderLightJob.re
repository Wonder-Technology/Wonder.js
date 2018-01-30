open StateDataType;

let _sendUniformShaderData = (gl, state: StateDataType.state) =>
  ShaderSystem.getAllShaderIndexArray(state)
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, shaderIndex) => {
           let program = ProgramSystem.unsafeGetProgram(shaderIndex, state);
           state
           |> ProgramSystem.use(gl, program)
           |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformShaderSendNoCachableData(
                shaderIndex
              )
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (
                    state,
                    {pos, getDataFunc, sendDataFunc}: uniformShaderSendNoCachableData
                  ) => {
                    [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(state));
                    state
                  }
                ),
                state
              )
           |> GLSLSenderConfigDataHandleSystem.unsafeGetUniformShaderSendCachableFunctionData(
                shaderIndex
              )
           |> ArraySystem.reduceState(
                [@bs]
                (
                  (
                    state,
                    {program, shaderCacheMap, locationMap, sendCachableFunctionDataFunc}: uniformShaderSendCachableFunctionData
                  ) =>
                    [@bs]
                    sendCachableFunctionDataFunc(gl, (program, shaderCacheMap, locationMap), state)
                ),
                state
              )
         }
       ),
       state
     );

let _getLightMaterialRenderArray = (renderArray, state: StateDataType.state) =>
  renderArray |> Js.Array.filter((uid) => GameObjectAdmin.hasLightMaterialComponent(uid, state));

let _render = (gl, state: StateDataType.state) => {
  let state = state |> _sendUniformShaderData(gl);
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    state
    |> _getLightMaterialRenderArray(renderArray)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) => {
             /* TODO handle instance */
             /* if (InstanceUtils.isSourceInstance(uid, state)) {
                  RenderBasicInstanceJobCommon.render(gl, uid, state)
                } else { */
             let (state, _, geometryIndex) = state |> FrontRenderLightJobCommon.render(gl, uid);
             GLSLSenderDrawUtils.drawElement(
               (
                 GeometryAdmin.getDrawMode(gl),
                 GeometryAdmin.getIndexType(gl),
                 GeometryAdmin.getIndexTypeSize(gl),
                 GeometryAdmin.getIndicesCount(geometryIndex, state)
               ),
               gl
             );
             state
           }
         ),
         state
       )
  }
};

let getJob = (configData, gl, state) => _render(gl, state);