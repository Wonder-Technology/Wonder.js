open StateDataMainType;

open WonderWebgl;

module DrawOutlineJobUtils = {
  open StateRenderType;

  /* TODO refactor: duplicate */
  module DrawOriginGameObjects = {
    open VboBufferType;

    open StateRenderType;

    open GLSLSenderType;

    let _getOrCreateBuffer =
        (
          buffer,
          (gl, geometryIndex),
          (
            (
              vertexBufferMap,
              /* texCoordBufferMap,
                 normalBufferMap, */
              elementArrayBufferMap,
            ),
            (
              getVerticesFunc,
              /* getTexCoordsFunc,
                 getNormalsFunc, */
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
      /* | TexCoord =>
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
           ) */
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
        (
          gl,
          (shaderIndex, geometryIndex) as indexTuple,
          sendRenderDataSubState,
          {vboBufferRecord, glslSenderRecord} as state,
        ) => {
      let currentGeometryBufferMapAndGetPointsFuncsTuple = (
        (
          vboBufferRecord.geometryVertexBufferMap,
          /* vboBufferRecord.geometryTexCoordBufferMap,
             vboBufferRecord.geometryNormalBufferMap, */
          vboBufferRecord.geometryElementArrayBufferMap,
        ),
        (
          GetGeometryVerticesRenderService.getVertices,
          /* GetGeometryTexCoordsRenderService.getTexCoords,
             GetGeometryNormalsRenderService.getNormals, */
          GetGeometryIndicesRenderService.getIndices,
          GetGeometryIndicesRenderService.getIndices32,
        ),
      );
      let dataTuple = (gl, geometryIndex);
      glslSenderRecord
      |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(
           shaderIndex,
         )
      |> WonderCommonlib.ArrayService.forEach(
           (. {pos, size, buffer, sendFunc}) => {
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

    let _sendUniformRenderObjectModelData =
        (
          gl,
          shaderIndex,
          transformIndex,
          getRenderDataSubState,
          {glslSenderRecord} as state,
        ) => {
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

             let state =
               state
               |> _sendAttributeData(
                    gl,
                    (shaderIndex, geometryIndex),
                    sendRenderDataSubState,
                  );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(state);

             let state =
               state
               |> _sendUniformRenderObjectModelData(
                    gl,
                    shaderIndex,
                    transformIndex,
                    getRenderDataSubState,
                  );

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
            (
              vertexBufferMap,
              /* texCoordBufferMap,
               */
              normalBufferMap,
              elementArrayBufferMap,
            ),
            (
              getVerticesFunc,
              /* getTexCoordsFunc,
               */
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
      /* | TexCoord =>
         ArrayBufferRenderService.getOrCreateBuffer(
           gl,
           (geometryIndex, texCoordBufferMap),
           [@bs] getTexCoordsFunc,
           state,
         )
          */
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
        (
          gl,
          (shaderIndex, geometryIndex) as indexTuple,
          sendRenderDataSubState,
          {vboBufferRecord, glslSenderRecord} as state,
        ) => {
      let currentGeometryBufferMapAndGetPointsFuncsTuple = (
        (
          vboBufferRecord.geometryVertexBufferMap,
          /* vboBufferRecord.geometryTexCoordBufferMap,
           */
          vboBufferRecord.geometryNormalBufferMap,
          vboBufferRecord.geometryElementArrayBufferMap,
        ),
        (
          GetGeometryVerticesRenderService.getVertices,
          /* GetGeometryTexCoordsRenderService.getTexCoords,
           */
          GetGeometryNormalsRenderService.getNormals,
          GetGeometryIndicesRenderService.getIndices,
          GetGeometryIndicesRenderService.getIndices32,
        ),
      );
      let dataTuple = (gl, geometryIndex);
      glslSenderRecord
      |> HandleAttributeConfigDataService.unsafeGetAttributeSendData(
           shaderIndex,
         )
      |> WonderCommonlib.ArrayService.forEach(
           (. {pos, size, buffer, sendFunc}) => {
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

    /* TODO refactor: duplicate */
    let _sendUniformRenderObjectModelData =
        (
          gl,
          shaderIndex,
          transformIndex,
          getRenderDataSubState,
          {glslSenderRecord} as state,
        ) => {
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

      state;
    };

    /* TODO refactor: duplicate */

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

             let state =
               state
               |> _sendAttributeData(
                    gl,
                    (shaderIndex, geometryIndex),
                    sendRenderDataSubState,
                  );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(state);

             let state =
               state
               |> _sendUniformRenderObjectModelData(
                    gl,
                    shaderIndex,
                    transformIndex,
                    getRenderDataSubState,
                  );

             state;
           },
           state,
         );
  };

  let _isInRenderArray = (gameObject, renderArray) =>
    Js.Array.includes(gameObject, renderArray);

  let _getGameObjectRenderDataFromRenderObjectData =
      (
        gameObjectNeedDrawOutline,
        {
          transformIndices,
          materialIndices,
          meshRendererIndices,
          geometryIndices,
        }: RenderType.renderObjectRecord,
      ) => {
    let transformIndex =
      RenderObjectBufferTypeArrayService.getComponent(
        gameObjectNeedDrawOutline,
        transformIndices,
      );
    let materialIndex =
      RenderObjectBufferTypeArrayService.getComponent(
        gameObjectNeedDrawOutline,
        materialIndices,
      );
    let meshRendererIndex =
      RenderObjectBufferTypeArrayService.getComponent(
        gameObjectNeedDrawOutline,
        meshRendererIndices,
      );
    let geometryIndex =
      RenderObjectBufferTypeArrayService.getComponent(
        gameObjectNeedDrawOutline,
        geometryIndices,
      );

    (transformIndex, materialIndex, meshRendererIndex, geometryIndex);
  };

  let _getGameObjectRenderDataFromBasicRenderObjectData =
      (
        gameObjectNeedDrawOutline,
        basicRenderObjectData,
        state: StateRenderType.renderState,
      ) =>
    switch (basicRenderObjectData) {
    | None =>
      WonderLog.Log.fatal(
        WonderLog.Log.buildFatalMessage(
          ~title="_getGameObjectRenderDataFromBasicRenderObjectData",
          ~description=
            {j|gameObjectNeedDrawOutline:$gameObjectNeedDrawOutline should has render object data|j},
          ~reason="",
          ~solution={j||j},
          ~params={j||j},
        ),
      )

    | Some(basicRenderObjectData) =>
      _getGameObjectRenderDataFromRenderObjectData(
        gameObjectNeedDrawOutline,
        basicRenderObjectData,
      )
    };

  let _getGameObjectRenderData =
      (
        gameObjectNeedDrawOutline,
        (basicRenderObjectDataOpt, lightRenderObjectDataOpt),
        state: StateRenderType.renderState,
      ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              test(
                Log.buildAssertMessage(
                  ~expect=
                    {j|gameObjectNeedDrawOutline shouldn't has sourceInstance|j},
                  ~actual={j|has|j},
                ),
                () => {
                  let sourceInstanceIndices =
                    switch (lightRenderObjectDataOpt) {
                    | None =>
                      switch (basicRenderObjectDataOpt) {
                      | None => None
                      | Some(
                          (
                            {sourceInstanceIndices}: RenderType.renderObjectRecord
                          ),
                        ) =>
                        Some(sourceInstanceIndices)
                      }
                    | Some(
                        (
                          {sourceInstanceIndices}: RenderType.renderObjectRecord
                        ),
                      ) =>
                      Some(sourceInstanceIndices)
                    };

                  switch (sourceInstanceIndices) {
                  | Some(sourceInstanceIndices) =>
                    RenderObjectBufferTypeArrayService.getComponent(
                      gameObjectNeedDrawOutline,
                      sourceInstanceIndices,
                    )
                    |> RenderObjectBufferTypeArrayService.hasSourceInstance
                    |> assertFalse
                  | None => assertPass()
                  };
                },
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    switch (lightRenderObjectDataOpt) {
    | None =>
      _getGameObjectRenderDataFromBasicRenderObjectData(
        gameObjectNeedDrawOutline,
        basicRenderObjectDataOpt,
        state,
      )
    | Some({renderArray} as lightRenderObjectData) =>
      _isInRenderArray(gameObjectNeedDrawOutline, renderArray) ?
        _getGameObjectRenderDataFromRenderObjectData(
          gameObjectNeedDrawOutline,
          lightRenderObjectData,
        ) :
        _getGameObjectRenderDataFromBasicRenderObjectData(
          gameObjectNeedDrawOutline,
          basicRenderObjectDataOpt,
          state,
        )
    };
  };

  let _notWriteToDepthBufferAndColorBuffer = (gl, deviceManagerRecord) =>
    deviceManagerRecord
    |> DeviceManagerService.setDepthWrite(gl, false)
    |> DeviceManagerService.setColorWrite(gl, (false, false, false, false));

  let _writeToDepthBufferAndColorBuffer = (gl, deviceManagerRecord) =>
    deviceManagerRecord
    |> DeviceManagerService.setDepthWrite(gl, true)
    |> DeviceManagerService.setColorWrite(gl, (true, true, true, true));

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
      /* |> DeviceManagerService.setSide(gl, Gl.getBack) */
      |> DeviceManagerService.setDepthTest(gl, true)
      |> _notWriteToDepthBufferAndColorBuffer(gl);

    {...state, deviceManagerRecord};
  };

  /* let _useProgram = (shaderName, state) => {
       let shaderIndex =
         NoMaterialShaderIndexShaderService.unsafeGetShaderIndex(shaderName);

       state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);
     }; */

  let _useDrawOriginGameObjectsProgram = (gl, shaderIndex, state) =>
    /* _useProgram("outline_draw_origin_gameObjects", state); */
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

  let _useDrawExpandGameObjectsProgram = (gl, shaderIndex, state) =>
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);
  /* _useProgram("outline_draw_expand_gameObjects", state); */

  /* let _drawOriginGameObjects =
     (
       (transformIndex, materialIndex, meshRendererIndex, geometryIndex),
       state,
     ) => {}; */

  let _setGlBeforeDrawScaledGameObjects =
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
      |> DeviceManagerService.setSide(gl, DeviceManagerType.BACK)
      |> DeviceManagerService.setDepthTest(gl, false)
      |> _notWriteToDepthBufferAndColorBuffer(gl);

    {...state, deviceManagerRecord};
  };

  /* let _drawExpandGameObjects = () => {}; */

  let _restoreGl = (gl, {deviceManagerRecord} as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> DeviceManagerService.setStencilTest(gl, false)
      |> DeviceManagerService.setStencilMask(gl, 0xFF)
      |> DeviceManagerService.setSide(gl, DeviceManagerType.FRONT)
      |> DeviceManagerService.setDepthTest(gl, true)
      |> _writeToDepthBufferAndColorBuffer(gl);

    {...state, deviceManagerRecord};
  };

  let exec =
      (
        (basicRenderObjectData, lightRenderObjectData),
        ({jobDataRecord, shaderRecord}: StateRenderType.renderState) as state,
      ) => {
    /* let {outlineData} = jobDataRecord; */

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

    let renderDataArr =
      OperateRenderJobDataService.getGameObjectsNeedDrawOutline(jobDataRecord)
      |> Js.Array.map(gameObjectNeedDrawOutline =>
           _getGameObjectRenderData(
             gameObjectNeedDrawOutline,
             (basicRenderObjectData, lightRenderObjectData),
             state,
           )
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
    |> _setGlBeforeDrawScaledGameObjects(gl)
    |> _useDrawExpandGameObjectsProgram(gl, drawExpandGameObjectsShaderIndex)
    |> DrawExpandGameObjects.draw(
         gl,
         drawExpandGameObjectsShaderIndex,
         renderDataArr,
       )
    |> _restoreGl(gl);
  };
};

/* TODO support worker job */
let execJob = (flags, state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    renderState
    |> DrawOutlineJobUtils.exec((
         OperateRenderMainService.getBasicRenderObjectRecord(state),
         OperateRenderMainService.getLightRenderObjectRecord(state),
       ));

  state;
};