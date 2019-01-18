open StateDataMainType;

open WonderWebgl;

module DrawOutlineJobUtils = {
  open StateRenderType;

  let _sendUniformRenderObjectModelData =
      (
        gl,
        shaderIndex,
        transformIndex,
        getRenderDataSubState,
        {glslSenderRecord} as state,
      ) => {
    open GLSLSenderType;

    glslSenderRecord
    |> HandleUniformRenderObjectModelService.unsafeGetUniformSendData(
         shaderIndex,
       )
    |> WonderCommonlib.ArrayService.forEach(
         (.
           {pos, getDataFunc, sendDataFunc}: uniformRenderObjectSendModelData,
         ) =>
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

  let _sendAttributeData =
      (
        gl,
        (shaderIndex, geometryIndex) as indexTuple,
        currentGeometryBufferMapAndGetPointsFuncsTuple,
        sendRenderDataSubState,
        {vboBufferRecord, glslSenderRecord} as state,
        getOrCreateBufferFunc,
      ) => {
    open GLSLSenderType;

    let dataTuple = (gl, geometryIndex);
    glslSenderRecord
    |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(
         shaderIndex,
       )
    |> WonderCommonlib.ArrayService.forEach(
         (. {pos, size, buffer, sendFunc}) => {
         let arrayBuffer =
           getOrCreateBufferFunc(
             buffer,
             dataTuple,
             currentGeometryBufferMapAndGetPointsFuncsTuple,
             state,
           );

         sendFunc(. gl, (size, pos), arrayBuffer, sendRenderDataSubState);
       });

    ();
  };

  module DrawOriginGameObjects = {
    open VboBufferType;

    open StateRenderType;

    open GLSLSenderType;

    let _getOrCreateBuffer =
        (
          buffer,
          (gl, geometryIndex),
          (
            (vertexBufferMap, elementArrayBufferMap),
            (getVerticesFunc, getIndicesFunc, getIndices32Func),
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
      | Index =>
        switch (
          GeometryRenderService.unsafeGetIndicesType(geometryIndex, state)
        ) {
        | Short =>
          ElementArrayBufferRenderService.getOrCreate16Buffer(
            gl,
            (geometryIndex, elementArrayBufferMap),
            getIndicesFunc(. geometryIndex, state),
            state,
          )
        | Int =>
          ElementArrayBufferRenderService.getOrCreate32Buffer(
            gl,
            (geometryIndex, elementArrayBufferMap),
            getIndices32Func(. geometryIndex, state),
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

    let _sendAttributeData =
        (gl, indexTuple, sendRenderDataSubState, {vboBufferRecord} as state) => {
      let currentGeometryBufferMapAndGetPointsFuncsTuple = (
        (
          vboBufferRecord.geometryVertexBufferMap,
          vboBufferRecord.geometryElementArrayBufferMap,
        ),
        (
          GetGeometryVerticesRenderService.getVertices,
          GetGeometryIndicesRenderService.getIndices,
          GetGeometryIndicesRenderService.getIndices32,
        ),
      );

      _sendAttributeData(
        gl,
        indexTuple,
        currentGeometryBufferMapAndGetPointsFuncsTuple,
        sendRenderDataSubState,
        state,
        _getOrCreateBuffer,
      );
    };

    let draw =
        (gl, shaderIndex, renderDataArr, state: StateRenderType.renderState) =>
      renderDataArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             state,
             (
               transformIndex,
               materialIndex,
               meshRendererIndex,
               geometryIndex,
             ),
           ) => {
             let sendRenderDataSubState =
               CreateSendRenederDataSubStateRenderService.createState(state);

             _sendAttributeData(
               gl,
               (shaderIndex, geometryIndex),
               sendRenderDataSubState,
               state,
             );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(state);

             _sendUniformRenderObjectModelData(
               gl,
               shaderIndex,
               transformIndex,
               getRenderDataSubState,
               state,
             );

             state
             |> RenderJobUtils.draw(gl, meshRendererIndex, geometryIndex);

             state;
           },
           state,
         );
  };

  module DrawExpandGameObjects = {
    open VboBufferType;

    open StateRenderType;

    open GLSLSenderType;

    let _getOrCreateBuffer =
        (
          buffer,
          (gl, geometryIndex),
          (
            (vertexBufferMap, normalBufferMap, elementArrayBufferMap),
            (
              getVerticesFunc,
              getNormalsFunc,
              getIndicesFunc,
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
      | Normal =>
        ArrayBufferRenderService.getOrCreateBuffer(
          gl,
          (geometryIndex, normalBufferMap),
          [@bs] getNormalsFunc,
          state,
        )
      | Index =>
        switch (
          GeometryRenderService.unsafeGetIndicesType(geometryIndex, state)
        ) {
        | Short =>
          ElementArrayBufferRenderService.getOrCreate16Buffer(
            gl,
            (geometryIndex, elementArrayBufferMap),
            getIndicesFunc(. geometryIndex, state),
            state,
          )
        | Int =>
          ElementArrayBufferRenderService.getOrCreate32Buffer(
            gl,
            (geometryIndex, elementArrayBufferMap),
            getIndices32Func(. geometryIndex, state),
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

    let _sendAttributeData =
        (gl, indexTuple, sendRenderDataSubState, {vboBufferRecord} as state) => {
      let currentGeometryBufferMapAndGetPointsFuncsTuple = (
        (
          vboBufferRecord.geometryVertexBufferMap,
          vboBufferRecord.geometryNormalBufferMap,
          vboBufferRecord.geometryElementArrayBufferMap,
        ),
        (
          GetGeometryVerticesRenderService.getVertices,
          GetGeometryNormalsRenderService.getNormals,
          GetGeometryIndicesRenderService.getIndices,
          GetGeometryIndicesRenderService.getIndices32,
        ),
      );

      _sendAttributeData(
        gl,
        indexTuple,
        currentGeometryBufferMapAndGetPointsFuncsTuple,
        sendRenderDataSubState,
        state,
        _getOrCreateBuffer,
      );
    };

    let _sendUniformNoMaterialShaderData =
        (gl, shaderIndex, getRenderDataSubState, {glslSenderRecord} as state) => {
      glslSenderRecord
      |> HandleNoMaterialShaderUniformConfigDataService.unsafeGetUniformSendData(
           shaderIndex,
         )
      |> WonderCommonlib.ArrayService.forEach(
           (.
             {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformNoMaterialShaderSendCachableData,
           ) =>
           GLSLLocationService.isUniformLocationExist(pos) ?
             sendDataFunc(.
               gl,
               shaderCacheMap,
               (name, pos),
               getDataFunc(. getRenderDataSubState),
             ) :
             ()
         );

      state;
    };

    let draw =
        (gl, shaderIndex, renderDataArr, state: StateRenderType.renderState) =>
      renderDataArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (.
             state,
             (
               transformIndex,
               materialIndex,
               meshRendererIndex,
               geometryIndex,
             ),
           ) => {
             let sendRenderDataSubState =
               CreateSendRenederDataSubStateRenderService.createState(state);

             _sendAttributeData(
               gl,
               (shaderIndex, geometryIndex),
               sendRenderDataSubState,
               state,
             );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(state);

             _sendUniformRenderObjectModelData(
               gl,
               shaderIndex,
               transformIndex,
               getRenderDataSubState,
               state,
             );
             _sendUniformNoMaterialShaderData(
               gl,
               shaderIndex,
               getRenderDataSubState,
               state,
             );

             state
             |> RenderJobUtils.draw(gl, meshRendererIndex, geometryIndex);

             state;
           },
           state,
         );
  };

  let _prepareGl = (gl, {deviceManagerRecord} as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> DeviceManagerService.setStencilTest(gl, true)
      |> DeviceManagerService.setStencilOp(
           gl,
           Gl.getKeep(gl),
           Gl.getKeep(gl),
           Gl.getReplace(gl),
         )
      |> DeviceManagerService.setStencilFunc(gl, Gl.getAlways(gl), 1, 0xFF)
      |> DeviceManagerService.setStencilMask(gl, 0xFF)
      |> DeviceManagerService.setDepthTest(gl, false)
      |> DeviceManagerService.setDepthWrite(gl, false)
      |> DeviceManagerService.setColorWrite(gl, (false, false, false, false));

    {...state, deviceManagerRecord};
  };

  let _useDrawOriginGameObjectsProgram = (gl, shaderIndex, state) =>
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

  let _useDrawExpandGameObjectsProgram = (gl, shaderIndex, state) =>
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

  let _setGlBeforeDrawExpandGameObjects =
      (gl, {deviceManagerRecord} as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> DeviceManagerService.setStencilFunc(
           gl,
           Gl.getNotEqual(gl),
           1,
           0xFF,
         )
      |> DeviceManagerService.setStencilMask(gl, 0x00)
      /* |> DeviceManagerService.setSide(gl, DeviceManagerType.BACK) */
      |> DeviceManagerService.setDepthTest(gl, false)
      |> DeviceManagerService.setDepthWrite(gl, false)
      |> DeviceManagerService.setColorWrite(gl, (true, true, true, true));

    {...state, deviceManagerRecord};
  };

  let _restoreGl = (gl, {deviceManagerRecord} as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> DeviceManagerService.setStencilTest(gl, false)
      |> DeviceManagerService.setStencilMask(gl, 0xFF)
      /* |> DeviceManagerService.setSide(gl, DeviceManagerType.FRONT) */
      |> DeviceManagerService.setDepthTest(gl, true)
      |> DeviceManagerService.setDepthWrite(gl, true);

    {...state, deviceManagerRecord};
  };

  let exec =
      (
        renderDataArr,
        ({jobDataRecord, shaderRecord}: StateRenderType.renderState) as state,
      ) => {
    let drawOriginGameObjectsShaderIndex =
      NoMaterialShaderIndexShaderService.unsafeGetShaderIndex(
        "outline_draw_origin_gameObjects",
        shaderRecord,
      );

    let drawExpandGameObjectsShaderIndex =
      NoMaterialShaderIndexShaderService.unsafeGetShaderIndex(
        "outline_draw_expand_gameObjects",
        shaderRecord,
      );

    let gl = DeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

    state
    |> _prepareGl(gl)
    |> _useDrawOriginGameObjectsProgram(gl, drawOriginGameObjectsShaderIndex)
    |> DrawOriginGameObjects.draw(
         gl,
         drawOriginGameObjectsShaderIndex,
         renderDataArr,
       )
    |> _setGlBeforeDrawExpandGameObjects(gl)
    |> _useDrawExpandGameObjectsProgram(gl, drawExpandGameObjectsShaderIndex)
    |> DrawExpandGameObjects.draw(
         gl,
         drawExpandGameObjectsShaderIndex,
         renderDataArr,
       )
    |> _restoreGl(gl);
  };
};

let _getMaterialComponent = (gameObject, gameObjectRecord) =>
  switch (
    GetComponentGameObjectService.getBasicMaterialComponent(.
      gameObject,
      gameObjectRecord,
    )
  ) {
  | Some(material) => Some(material)
  | None =>
    switch (
      GetComponentGameObjectService.getLightMaterialComponent(.
        gameObject,
        gameObjectRecord,
      )
    ) {
    | Some(material) => Some(material)
    | None => None
    }
  };

let _getRenderDataArr = ({jobDataRecord, gameObjectRecord} as state) =>
  OperateRenderJobDataService.getGameObjectsNeedDrawOutline(jobDataRecord)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. renderDataArr, gameObjectNeedDrawOutline) => {
         let transform =
           GetComponentGameObjectService.unsafeGetTransformComponent(
             gameObjectNeedDrawOutline,
             gameObjectRecord,
           );

         switch (
           GetComponentGameObjectService.getGeometryComponent(.
             gameObjectNeedDrawOutline,
             gameObjectRecord,
           )
           |> Js.Option.andThen((. geometry) =>
                _getMaterialComponent(
                  gameObjectNeedDrawOutline,
                  gameObjectRecord,
                )
                |> Js.Option.andThen((. material) =>
                     GetComponentGameObjectService.getMeshRendererComponent(.
                       gameObjectNeedDrawOutline,
                       gameObjectRecord,
                     )
                     |> Js.Option.andThen((. meshRenderer) =>
                          Some((transform, material, meshRenderer, geometry))
                        )
                   )
              )
         ) {
         | None => renderDataArr
         | Some(renderData) => renderDataArr |> ArrayService.push(renderData)
         };
       },
       [||],
     );

/* TODO support worker job */
let execJob = (flags, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    renderState |> DrawOutlineJobUtils.exec(_getRenderDataArr(state));

  state;
};