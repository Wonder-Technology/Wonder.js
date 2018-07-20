open StateRenderType;

open VboBufferType;

open GeometryType;

let _getOrCreateBuffer =
    (
      buffer,
      (gl, geometryIndex),
      (
        (
          vertexBufferMap,
          texCoordBufferMap,
          normalBufferMap,
          elementArrayBufferMap,
        ),
        (getVerticesFunc, getTexCoordsFunc, getNormalsFunc, getIndicesFunc),
      ),
      state,
    ) =>
  switch (buffer) {
  | VERTEX =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, vertexBufferMap),
      [@bs] getVerticesFunc,
      state,
    )
  | TEXCOORD =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, texCoordBufferMap),
      [@bs] getTexCoordsFunc,
      state,
    )
  | NORMAL =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, normalBufferMap),
      [@bs] getNormalsFunc,
      state,
    )
  | INDEX =>
    ElementArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, elementArrayBufferMap),
      [@bs] getIndicesFunc,
      state,
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_sendAttributeData",
        ~description={j|unknown buffer: $buffer|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let _directlySendAttributeData =
    (
      gl,
      (shaderIndex, geometryIndex, geometryType),
      {vboBufferRecord, glslSenderRecord} as state,
    ) => {
  let currentGeometryBufferMapAndGetPointsFuncsTuple =
    CurrentComponentDataMapRenderService.getCurrentGeometryBufferMapAndGetPointsFuncs(
      geometryType,
      vboBufferRecord,
    );
  let dataTuple = (gl, geometryIndex);
  glslSenderRecord
  |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, {pos, size, buffer, sendFunc}) => {
         let arrayBuffer =
           _getOrCreateBuffer(
             buffer,
             dataTuple,
             currentGeometryBufferMapAndGetPointsFuncsTuple,
             state,
           );
         sendFunc(. gl, (size, pos), arrayBuffer, state);
       },
       state,
     );
};

let _sendAttributeData =
    (gl, (shaderIndex, geometryIndex, geometryType) as indexTuple, state) => {
  let {lastSendGeometryData} as record = state.glslSenderRecord;
  switch (lastSendGeometryData) {
  | Some((lastSendGeometryIndex, lastSendGeometryType))
      when
        lastSendGeometryIndex === geometryIndex
        && lastSendGeometryType === geometryType => state
  | _ =>
    record.lastSendGeometryData = Some((geometryIndex, geometryType));
    _directlySendAttributeData(gl, indexTuple, state);
  };
};

let _sendUniformRenderObjectModelData =
    (gl, shaderIndex, transformIndex, {glslSenderRecord} as state) =>
  glslSenderRecord
  |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         state,
         {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData,
       ) => {
         GLSLLocationService.isUniformLocationExist(pos) ?
           sendDataFunc(. gl, pos, getDataFunc(. transformIndex, state)) : ();
         state;
       },
       state,
     );

let _sendUniformRenderObjectMaterialData =
    (gl, shaderIndex, materialIndex, {glslSenderRecord} as state) =>
  glslSenderRecord
  |> HandleUniformRenderObjectMaterialService.unsafeGetUniformSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (.
         state,
         {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendMaterialData,
       ) => {
         sendDataFunc(.
           gl,
           shaderCacheMap,
           (name, pos),
           getDataFunc(. materialIndex, state),
         );
         state;
       },
       state,
     );

let render =
    (
      gl,
      (
        transformIndex,
        materialIndex,
        shaderIndex,
        geometryIndex,
        geometryType,
      ),
      bindAndUpdateFunc,
      {programRecord} as state,
    ) => {
  let program = ProgramService.unsafeGetProgram(shaderIndex, programRecord);
  let state =
    state
    |> UseProgramRenderService.use(gl, program)
    |> _sendAttributeData(gl, (shaderIndex, geometryIndex, geometryType))
    |> _sendUniformRenderObjectModelData(gl, shaderIndex, transformIndex);
  let {lastSendMaterialData} as record = state.glslSenderRecord;
  switch (lastSendMaterialData) {
  | Some((lastSendMaterial, lastSendShader))
      when lastSendMaterial === materialIndex && lastSendShader === shaderIndex => state
  | _ =>
    record.lastSendMaterialData = Some((materialIndex, shaderIndex));
    let state =
      state
      |> _sendUniformRenderObjectMaterialData(gl, shaderIndex, materialIndex);
    bindAndUpdateFunc(. gl, materialIndex, state);
  };
};

let draw = (gl, geometryIndex, geometryType, state) => {
  let getIndicesCountFunc =
    CurrentComponentDataMapRenderService.getGetIndicesCountFunc(geometryType);
  DrawGLSLService.drawElement(
    (
      RenderGeometryService.getDrawMode(gl),
      RenderGeometryService.getIndexType(gl),
      RenderGeometryService.getIndexTypeSize(gl),
      getIndicesCountFunc(. geometryIndex, state),
    ),
    gl,
  );
};