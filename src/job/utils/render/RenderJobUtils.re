open StateRenderType;

open VboBufferType;

open GeometryType;

open GLSLSenderType;

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
        (
          getVerticesFunc,
          getTexCoordsFunc,
          getNormalsFunc,
          getIndices16Func,
          getIndices32Func,
        ),
      ),
      state,
    ) =>
  switch (buffer) {
  | Vertex =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, vertexBufferMap),
      [@bs] getVerticesFunc,
      state,
    )
  | TexCoord =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, texCoordBufferMap),
      [@bs] getTexCoordsFunc,
      state,
    )
  | Normal =>
    ArrayBufferRenderService.getOrCreateBuffer(
      gl,
      (geometryIndex, normalBufferMap),
      [@bs] getNormalsFunc,
      state,
    )
  | Index =>
    switch (GeometryRenderService.unsafeGetIndicesType(geometryIndex, state)) {
    | Short =>
      ElementArrayBufferRenderService.getOrCreate16Buffer(
        gl,
        (geometryIndex, elementArrayBufferMap),
        getIndices16Func,
        state,
      )
    | Int =>
      ElementArrayBufferRenderService.getOrCreate32Buffer(
        gl,
        (geometryIndex, elementArrayBufferMap),
        getIndices32Func,
        state,
      )
    }
  | buffer =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getOrCreateBuffer",
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
      (shaderIndex, geometryIndex),
      sendRenderDataSubState,
      {vboBufferRecord, glslSenderRecord} as state,
    ) => {
  let currentGeometryBufferMapAndGetPointsFuncsTuple = (
    (
      vboBufferRecord.geometryVertexBufferMap,
      vboBufferRecord.geometryTexCoordBufferMap,
      vboBufferRecord.geometryNormalBufferMap,
      vboBufferRecord.geometryElementArrayBufferMap,
    ),
    (
      GetGeometryVerticesRenderService.getVertices,
      GetGeometryTexCoordsRenderService.getTexCoords,
      GetGeometryNormalsRenderService.getNormals,
      GetGeometryIndicesRenderService.getIndices16,
      GetGeometryIndicesRenderService.getIndices32,
    ),
  );
  let dataTuple = (gl, geometryIndex);
  glslSenderRecord
  |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(shaderIndex)
  |> WonderCommonlib.ArrayService.forEach((. {pos, size, buffer, sendFunc}) => {
       /* TODO should return state and arrayBuffer */
       let arrayBuffer =
         _getOrCreateBuffer(
           buffer,
           dataTuple,
           currentGeometryBufferMapAndGetPointsFuncsTuple,
           state,
         );
       sendFunc(. gl, (size, pos), arrayBuffer, sendRenderDataSubState);
     });

  state;
};

let sendAttributeData =
    (
      gl,
      (shaderIndex, geometryIndex) as indexTuple,
      sendRenderDataSubState,
      state,
    ) =>
  /*
   TODO when use vao and sort geometry, use lastSendGeometryData optimize!!!
   (because if not, should judge both last send geometry index and last send attribute data type(e.g. texCoords, ...)!!!)
   let {lastSendGeometryData} as record = state.glslSenderRecord;
      switch (lastSendGeometryData) {
      | Some(lastSendGeometryData) when lastSendGeometryData === geometryIndex => state
      | _ =>
        record.lastSendGeometryData = Some(geometryIndex);
        _directlySendAttributeData(gl, indexTuple, state);
      }; */
  _directlySendAttributeData(gl, indexTuple, sendRenderDataSubState, state);

let sendUniformRenderObjectModelData =
    (
      gl,
      (shaderIndex, transformIndex),
      (getRenderDataSubState, {glslSenderRecord} as state),
    ) => {
  glslSenderRecord
  |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.forEach(
       (. {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData) =>
       GLSLLocationService.isUniformLocationExist(pos) ?
         sendDataFunc(.
           gl,
           pos,
           getDataFunc(. transformIndex, getRenderDataSubState),
         ) :
         ()
     );

  ();
};

let sendUniformRenderObjectMaterialData =
    (
      gl,
      (shaderIndex, materialIndex),
      getRenderDataSubState,
      {glslSenderRecord} as state,
    ) => {
  glslSenderRecord
  |> HandleUniformRenderObjectMaterialService.unsafeGetUniformSendData(
       shaderIndex,
     )
  |> WonderCommonlib.ArrayService.forEach(
       (.
         {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendMaterialData,
       )
       /* TODO should return shaderCacheMap or state? */
       =>
         sendDataFunc(.
           gl,
           shaderCacheMap,
           (name, pos),
           getDataFunc(. materialIndex, getRenderDataSubState),
         )
       );

  state;
};

let render =
    (
      gl,
      (
        transformIndex,
        materialIndex,
        shaderIndex,
        meshRendererIndex: MeshRendererType.meshRenderer,
        geometryIndex,
      ),
      bindAndUpdateFunc,
      {programRecord} as state,
    ) => {
  let state =
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

  let sendRenderDataSubState =
    CreateSendRenederDataSubStateRenderService.createState(state);

  let state =
    state
    |> sendAttributeData(
         gl,
         (shaderIndex, geometryIndex),
         sendRenderDataSubState,
       );

  let getRenderDataSubState =
    CreateGetRenederDataSubStateRenderService.createState(state);

  let () =
    sendUniformRenderObjectModelData(
      gl,
      (shaderIndex, transformIndex),
      (getRenderDataSubState, state),
    );

  let {lastSendMaterialData} as record = state.glslSenderRecord;
  switch (lastSendMaterialData) {
  | Some((lastSendMaterial, lastSendShader))
      when lastSendMaterial === materialIndex && lastSendShader === shaderIndex => state
  | _ =>
    record.lastSendMaterialData = Some((materialIndex, shaderIndex));

    let getRenderDataSubState =
      CreateGetRenederDataSubStateRenderService.createState(state);

    let state = bindAndUpdateFunc(. gl, materialIndex, state);

    let state =
      state
      |> sendUniformRenderObjectMaterialData(
           gl,
           (shaderIndex, materialIndex),
           getRenderDataSubState,
         );

    state;
  };
};

let draw = (gl, glDrawMode, geometryIndex, state) =>
  DrawGLSLService.drawElement(
    (
      glDrawMode,
      GeometryRenderService.getIndexType(gl, geometryIndex, state),
      GeometryRenderService.getIndexTypeSize(gl, geometryIndex, state),
      GetGeometryIndicesRenderService.getIndicesCount(. geometryIndex, state),
    ),
    gl,
  );