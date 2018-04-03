open MainStateDataType;

let _getBasicMaterialRenderArray = (renderArray, state: MainStateDataType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasBasicMaterialComponent(uid, state.gameObjectRecord)
     );

let _render = (gl, state: MainStateDataType.state) =>
  switch state.renderRecord.basicRenderObjectRecord {
  | None => state
  | Some({
      count,
      transformIndices,
      materialIndices,
      shaderIndices,
      geometryIndices,
      geometryTypes,
      sourceInstanceIndices
    }) =>
    ArrayService.range(0, count - 1)
    |> ReduceStateMainService.reduceState(
         [@bs]
         (
           (state, index) => {
             let transformIndex =
               BasicRenderObjectBufferService.getComponent(index, transformIndices);
             let materialIndex =
               BasicRenderObjectBufferService.getComponent(index, materialIndices);
             let shaderIndex = BasicRenderObjectBufferService.getComponent(index, shaderIndices);
             let geometryIndex =
               BasicRenderObjectBufferService.getComponent(index, geometryIndices);
             let geometryType = BasicRenderObjectBufferService.getGeometryType(index, geometryTypes);
             let sourceInstance =
               BasicRenderObjectBufferService.getComponent(index, sourceInstanceIndices);
             if (BasicRenderObjectBufferService.hasSourceInstance(sourceInstance)) {
               RenderBasicInstanceJobCommon.render(gl, (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType, sourceInstance), state)
             } else {
               let state =
                 [@bs]
                 RenderBasicJobCommon.render(
                   gl,
                   (transformIndex, materialIndex, shaderIndex, geometryIndex, geometryType),
                   state
                 );
               let getIndicesCountFunc =
                 CurrentComponentDataMapService.getGetIndicesCountFunc(geometryType);
               DrawGLSLMainService.drawElement(
                 (
                   RenderGeometryService.getDrawMode(gl),
                   RenderGeometryService.getIndexType(gl),
                   RenderGeometryService.getIndexTypeSize(gl),
                   getIndicesCountFunc(geometryIndex, state)
                 ),
                 gl
               );
               state
             }
           }
         ),
         state
       )
  };

let execJob = (flags, _, state) =>
  _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);