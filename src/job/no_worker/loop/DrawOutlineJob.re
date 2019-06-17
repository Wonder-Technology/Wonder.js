open WonderWebgl;

module DrawOutlineJobUtils = {
  module DrawOriginGameObjects = {
    open AllVboBufferType;

    open StateRenderType;

    open AllGLSLSenderType;

    let draw =
        (gl, shaderIndex, renderDataArr, state: StateRenderType.renderState) =>
      renderDataArr
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. state, (transformIndex, meshRendererIndex, geometryIndex)) => {
             let sendRenderDataSubState =
               CreateSendRenederDataSubStateRenderService.createState(state);

             RenderJobUtils.sendAttributeData(
               gl,
               (shaderIndex, geometryIndex),
               sendRenderDataSubState,
               state,
             );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(state);

             RenderJobUtils.sendUniformRenderObjectModelData(
               gl,
               (shaderIndex, transformIndex),
               (getRenderDataSubState, state),
             );

             state
             |> RenderJobUtils.draw(
                  gl,
                  DrawModeMeshRendererService.getGlDrawMode(
                    gl,
                    meshRendererIndex,
                    state,
                  ),
                  geometryIndex,
                );

             state;
           },
           state,
         );
  };

  module DrawExpandGameObjects = {
    open AllVboBufferType;

    open StateRenderType;

    open AllGLSLSenderType;

    let _sendUniformNoMaterialShaderData =
        (gl, shaderIndex, getRenderDataSubState, {glslSenderRecord} as state) => {
      glslSenderRecord
      |> HandleNoMaterialShaderUniformConfigDataService.unsafeGetUniformSendData(
           shaderIndex,
         )
      |> WonderCommonlib.ArrayService.forEach(
           (.
             {shaderCacheMap, name, pos, getDataFunc, sendDataFunc}: uniformNoMaterialShaderSendData,
           ) =>
           AllGLSLLocationService.isUniformLocationExist(pos) ?
             (Obj.magic(sendDataFunc))(.
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
           (. state, (transformIndex, meshRendererIndex, geometryIndex)) => {
             let sendRenderDataSubState =
               CreateSendRenederDataSubStateRenderService.createState(state);

             RenderJobUtils.sendAttributeData(
               gl,
               (shaderIndex, geometryIndex),
               sendRenderDataSubState,
               state,
             );

             let getRenderDataSubState =
               CreateGetRenederDataSubStateRenderService.createState(state);

             RenderJobUtils.sendUniformRenderObjectModelData(
               gl,
               (shaderIndex, transformIndex),
               (getRenderDataSubState, state),
             );
             _sendUniformNoMaterialShaderData(
               gl,
               shaderIndex,
               getRenderDataSubState,
               state,
             );

             state
             |> RenderJobUtils.draw(
                  gl,
                  DrawModeMeshRendererService.getGlDrawMode(
                    gl,
                    meshRendererIndex,
                    state,
                  ),
                  geometryIndex,
                );

             state;
           },
           state,
         );
  };

  let _prepareGlState =
      (gl, ({deviceManagerRecord}: StateRenderType.renderState) as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> AllDeviceManagerService.setStencilTest(gl, true)
      |> AllDeviceManagerService.setStencilOp(
           gl,
           (Gl.getKeep(gl), Gl.getKeep(gl), Gl.getReplace(gl)),
         )
      |> AllDeviceManagerService.setStencilFunc(
           gl,
           (Gl.getAlways(gl), 1, 0xFF),
         )
      |> AllDeviceManagerService.setStencilMask(gl, 0xFF)
      |> AllDeviceManagerService.setDepthTest(gl, false)
      |> AllDeviceManagerService.setDepthWrite(gl, false)
      |> AllDeviceManagerService.setColorWrite(gl, (false, false, false, false));

    {...state, deviceManagerRecord};
  };

  let _useDrawOriginGameObjectsProgram = (gl, shaderIndex, state) =>
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

  let _useDrawExpandGameObjectsProgram = (gl, shaderIndex, state) =>
    state |> UseProgramRenderService.useByShaderIndex(gl, shaderIndex);

  let _setGlStateBeforeDrawExpandGameObjects =
      (gl, ({deviceManagerRecord}: StateRenderType.renderState) as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> AllDeviceManagerService.setStencilFunc(
           gl,
           (Gl.getNotEqual(gl), 1, 0xFF),
         )
      |> AllDeviceManagerService.setStencilMask(gl, 0x00)
      /* |> AllDeviceManagerService.setSide(gl, AllDeviceManagerType.BACK) */
      |> AllDeviceManagerService.setDepthTest(gl, false)
      |> AllDeviceManagerService.setDepthWrite(gl, false)
      |> AllDeviceManagerService.setColorWrite(gl, (true, true, true, true));

    {...state, deviceManagerRecord};
  };

  let _restoreGlState =
      (gl, ({deviceManagerRecord}: StateRenderType.renderState) as state) => {
    let deviceManagerRecord =
      deviceManagerRecord
      |> AllDeviceManagerService.setStencilTest(gl, false)
      |> AllDeviceManagerService.setStencilMask(gl, 0xFF)
      /* |> AllDeviceManagerService.setSide(gl, AllDeviceManagerType.FRONT) */
      |> AllDeviceManagerService.setDepthTest(gl, true)
      |> AllDeviceManagerService.setDepthWrite(gl, true);

    {...state, deviceManagerRecord};
  };

  let _clearLastSendComponent =
      (({glslSenderRecord}: StateRenderType.renderState) as state) => {
    ...state,
    glslSenderRecord:
      glslSenderRecord |> ClearLastSendComponentJobUtils.execJob,
  };

  let exec =
      (
        renderDataArr,
        ({jobDataRecord, shaderRecord}: StateRenderType.renderState) as state,
      ) => {
    let drawOriginGameObjectsShaderIndex =
      NoMaterialShaderIndexAllShaderService.unsafeGetShaderIndex(
        "outline_draw_origin_gameObjects",
        shaderRecord,
      );

    let drawExpandGameObjectsShaderIndex =
      NoMaterialShaderIndexAllShaderService.unsafeGetShaderIndex(
        "outline_draw_expand_gameObjects",
        shaderRecord,
      );

    let gl = AllDeviceManagerService.unsafeGetGl(. state.deviceManagerRecord);

    state
    |> _prepareGlState(gl)
    |> _useDrawOriginGameObjectsProgram(gl, drawOriginGameObjectsShaderIndex)
    |> DrawOriginGameObjects.draw(
         gl,
         drawOriginGameObjectsShaderIndex,
         renderDataArr,
       )
    |> _clearLastSendComponent
    |> _setGlStateBeforeDrawExpandGameObjects(gl)
    |> _useDrawExpandGameObjectsProgram(gl, drawExpandGameObjectsShaderIndex)
    |> DrawExpandGameObjects.draw(
         gl,
         drawExpandGameObjectsShaderIndex,
         renderDataArr,
       )
    |> _restoreGlState(gl);
  };
};

let _getRenderDataArr =
    (({jobDataRecord, gameObjectRecord}: StateDataMainType.state) as state) =>
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
                GetComponentGameObjectService.getMeshRendererComponent(.
                  gameObjectNeedDrawOutline,
                  gameObjectRecord,
                )
                |> Js.Option.andThen((. meshRenderer) =>
                     Some((transform, meshRenderer, geometry))
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
let execJob = (flags, state: StateDataMainType.state) => {
  let renderState = CreateRenderStateMainService.createRenderState(state);

  let renderState =
    renderState |> DrawOutlineJobUtils.exec(_getRenderDataArr(state));

  state;
};