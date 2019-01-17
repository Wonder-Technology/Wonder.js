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

      ();
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

      ();
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

      ();
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

      ();
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

  /* let _getGameObjectRenderDataFromRenderObjectData =
       (gameObjectNeedDrawOutline, renderObjectData) =>
     switch (renderObjectData) {
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

     | Some(
         (
           {
             transformIndices,
             materialIndices,
             meshRendererIndices,
             geometryIndices,
           }: RenderType.renderObjectRecord
         ),
       ) =>
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
     }; */

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
      /* |> DeviceManagerService.setDepthTest(gl, true) */
      |> DeviceManagerService.setDepthTest(gl, false)
      |> DeviceManagerService.setDepthWrite(gl, false)
      |> DeviceManagerService.setColorWrite(gl, (false, false, false, false));

    /* |> _notWriteToColorBuffer(gl); */

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
      |> DeviceManagerService.setSide(gl, DeviceManagerType.BACK)
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
      |> DeviceManagerService.setSide(gl, DeviceManagerType.FRONT)
      |> DeviceManagerService.setDepthTest(gl, true)
      |> DeviceManagerService.setDepthWrite(gl, true);

    {...state, deviceManagerRecord};
  };

  let exec =
      /* (basicRenderObjectData, lightRenderObjectData), */
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

    /* WonderLog.Log.print((
               "zzz:",
       OperateRenderJobDataService.getBasicGameObjectsNeedDrawOutline(
                 jobDataRecord,
               ),
       OperateRenderJobDataService.getLightGameObjectsNeedDrawOutline(
                 jobDataRecord,
               )
             )) |> ignore;

           let renderDataArr =
             ArrayService.fastConcat(
               OperateRenderJobDataService.getBasicGameObjectsNeedDrawOutline(
                 jobDataRecord,
               )
               |> Js.Array.map(gameObjectNeedDrawOutline =>
                    _getGameObjectRenderDataFromRenderObjectData(
                      gameObjectNeedDrawOutline,
                      basicRenderObjectData,
                    )
                  ),
               OperateRenderJobDataService.getLightGameObjectsNeedDrawOutline(
                 jobDataRecord,
               )
               |> Js.Array.map(gameObjectNeedDrawOutline =>
                    _getGameObjectRenderDataFromRenderObjectData(
                      gameObjectNeedDrawOutline,
                      lightRenderObjectData,
                    )
                  ),
             ); */

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

/* let _handleNone = (func, optionData) =>
   switch (optionData) {
   | None => func()
   | Some(x) => Some(x)
   }; */

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
/* GetComponentGameObjectService.getBasicMaterialComponent(.
     gameObject,
     gameObjectRecord,
   )
   |> _handleNone(() =>
        GetComponentGameObjectService.getLightMaterialComponent(.
          gameObject,
          gameObjectRecord,
        )
        |> _handleNone
      ); */

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
    renderState
    |> DrawOutlineJobUtils.exec(
         _getRenderDataArr(state),
         /* (
              OperateRenderMainService.getBasicRenderObjectRecord(state),
              OperateRenderMainService.getLightRenderObjectRecord(state),
            ) */
       );

  state;
};