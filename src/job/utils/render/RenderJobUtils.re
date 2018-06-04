open StateRenderType;

open VboBufferType;

let _getOrCreateBuffer =
    (
      buffer,
      (gl, geometryIndex),
      (
        (vertexBufferMap, texCoordBufferMap, normalBufferMap, elementArrayBufferMap),
        (getVerticesFunc, getTexCoordsFunc, _, getIndicesFunc)
      ),
      state
    ) =>
  switch buffer {
  | "vertex" =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, vertexBufferMap),
      [@bs] getVerticesFunc,
      state
    )
  | "texCoord" =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, texCoordBufferMap),
      [@bs] getTexCoordsFunc,
      state
    )
  | "normal" =>
    ArrayBufferRenderService.getOrCreateNormalBuffer(
      gl,
      (geometryIndex, normalBufferMap),
      state
    )
  | "index" =>
    ElementArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, elementArrayBufferMap),
      [@bs] getIndicesFunc,
      state
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_sendAttributeData",
        ~description={j|unknown buffer: $buffer|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j}
      )
    )
  };

let _directlySendAttributeData =
    (gl, (shaderIndex, geometryIndex, geometryType), {vboBufferRecord, glslSenderRecord} as state) => {
  let currentGeometryBufferMapAndGetPointsFuncsTuple =
    CurrentComponentDataMapRenderService.getCurrentGeometryBufferMapAndGetPointsFuncs(
      geometryType,
      vboBufferRecord
    );
  let dataTuple = (gl, geometryIndex);
  glslSenderRecord
  |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, {pos, size, buffer, sendFunc}) => {
           let arrayBuffer =
             _getOrCreateBuffer(
               buffer,
               dataTuple,
               currentGeometryBufferMapAndGetPointsFuncsTuple,
               state
             );
           [@bs] sendFunc(gl, (size, pos), arrayBuffer, state)
         }
       ),
       state
     )
};

let _sendAttributeData = (gl, (shaderIndex, geometryIndex, geometryType) as indexTuple, state) => {
  let {lastSendGeometry} as record = state.glslSenderRecord;
  switch lastSendGeometry {
  | Some((lastSendGeometryIndex, lastSendGeometryType))
      when lastSendGeometryIndex === geometryIndex && lastSendGeometryType === geometryType => state
  | _ =>
    record.lastSendGeometry = Some((geometryIndex, geometryType));
    _directlySendAttributeData(gl, indexTuple, state)
  }
};

let _sendUniformRenderObjectModelData =
    (gl, shaderIndex, transformIndex, {glslSenderRecord} as state) =>
  glslSenderRecord
  |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(shaderIndex)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         (state, {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData) => {
           [@bs] sendDataFunc(gl, pos, [@bs] getDataFunc(transformIndex, state));
           state
         }
       ),
       state
     );

let _sendUniformRenderObjectMaterialData =
    (gl, shaderIndex, materialIndex, {glslSenderRecord} as state) =>
  glslSenderRecord
  |> HandleUniformRenderObjectMaterialService.unsafeGetUniformSendData(shaderIndex)
  |> WonderCommonlib.ArrayService.reduceOneParam(
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

let render =
    (
      gl,
      (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
      bindAndUpdateFunc,
      {programRecord} as state
    ) => {
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let state =
    state
    |> UseProgramRenderService.use(gl, program)
    |> _sendAttributeData(gl, (shaderIndex, geometryIndex, geometryType))
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterial} as record = state.glslSenderRecord;
  switch lastSendMaterial {
  | Some(lastSendMaterial) when lastSendMaterial === materialIndex => state
  | _ =>
    record.lastSendMaterial = Some(materialIndex);
    let state = state |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex);
    [@bs] bindAndUpdateFunc(gl, materialIndex, state)
  }
};

let draw = (gl, geometryIndex, geometryType, state) => {
  let getIndicesCountFunc =
    CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
  DrawGLSLService.drawElement(
    (
      RenderGeometryService.getDrawMode(gl),
      RenderGeometryService.getIndexType(gl),
      RenderGeometryService.getIndexTypeSize(gl),
      [@bs] getIndicesCountFunc(geometryIndex, state)
    ),
    gl
  )
};