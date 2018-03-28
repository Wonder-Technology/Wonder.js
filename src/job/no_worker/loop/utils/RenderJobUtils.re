open MainStateDataType;

open VboBufferType;

let _directlySendAttributeData =
    (
      gl,
      shaderIndex,
      (
        geometryIndex,
        _,
        (vertexBufferMap, normalBufferMap, elementArrayBufferMap),
        getVerticesFunc,
        getNormalsFunc,
        getIndicesFunc,
        _
      ),
      state
    ) =>
  state
  |> HandleAttributeConfigDataMainService.unsafeGetAttributeSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, {pos, size, buffer, sendFunc}) => {
           let arrayBuffer =
             switch buffer {
             | "vertex" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, vertexBufferMap),
                 [@bs] getVerticesFunc,
                 state
               )
             | "normal" =>
               ArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, normalBufferMap),
                 [@bs] getNormalsFunc,
                 state
               )
             | "index" =>
               ElementArrayBufferMainService.getOrCreateBuffer(
                 gl,
                 (geometryIndex, elementArrayBufferMap),
                 [@bs] getIndicesFunc,
                 state
               )
             | _ =>
               WonderLog.Log.fatal(
                 WonderLog.Log.buildFatalMessage(
                   ~title="_sendAttributeData",
                   ~description={j|unknonw buffer: $buffer|j},
                   ~reason="",
                   ~solution={j||j},
                   ~params={j||j}
                 )
               )
             };
           [@bs] sendFunc(gl, (size, pos), arrayBuffer, state)
         }
       ),
       state
     );

let _sendAttributeData =
    (
      gl,
      shaderIndex,
      (geometryIndex, type_, _, getVerticesFunc, getNormalsFunc, getIndicesFunc, _) as geometryData,
      state
    ) => {
  let {lastSendGeometry} as record = state.glslSenderRecord;
  switch lastSendGeometry {
  | Some((lastSendGeometryIndex, lastSendGeometryType))
      when lastSendGeometryIndex === geometryIndex && lastSendGeometryType === type_ => state
  | _ =>
    record.lastSendGeometry = Some((geometryIndex, type_));
    _directlySendAttributeData(gl, shaderIndex, geometryData, state)
  }
};

let _sendUniformRenderObjectModelData = (gl, shaderIndex, transformIndex, state) =>
  state
  |> HandleUniformRenderObjectModelMainService.unsafeGetUniformSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (state, {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData) => {
           [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(transformIndex, state));
           state
         }
       ),
       state
     );

let _sendUniformRenderObjectMaterialData = (gl, shaderIndex, materialIndex, state) =>
  state
  |> HandleUniformRenderObjectMaterialMainService.unsafeGetUniformSendData(shaderIndex)
  |> ReduceStateMainService.reduceState(
       [@bs]
       (
         (
           state,
           {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendMaterialData
         ) => {
           [@bs]
           sendDataFunc(gl, shaderCacheMap, (name, pos), [@bs] getDataFunc(materialIndex, state));
           state
         }
       ),
       state
     );

let render = (gl, (materialIndex, shaderIndex, uid), {programRecord, gameObjectRecord} as state) => {
  let transformIndex: int =
    GetComponentGameObjectService.unsafeGetTransformComponent(uid, gameObjectRecord);
  let geometryData =
    GetComponentGameObjectService.unsafeGetGeometryDataComponent(uid, gameObjectRecord);
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let state =
    state
    |> UseProgramMainService.use(gl, program)
    |> _sendAttributeData(gl, shaderIndex, geometryData)
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as record = state.glslSenderRecord;
  let state =
    switch lastSendMaterial {
    | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
    | _ =>
      record.lastSendMaterial = Some(materialIndex);
      state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex)
    };
  (state, shaderIndex, geometryData)
};