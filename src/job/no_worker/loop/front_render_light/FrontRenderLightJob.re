open MainStateDataType;

let _getLightMaterialRenderArray = (renderArray, state: MainStateDataType.state) =>
  renderArray
  |> Js.Array.filter(
       (uid) =>
         HasComponentGameObjectService.hasLightMaterialComponent(uid, state.gameObjectRecord)
     );

let _render = (gl, state: MainStateDataType.state) =>
  switch (state |> OperateRenderMainService.getRenderArray) {
  | None => state
  | Some(renderArray) =>
    state
    |> _getLightMaterialRenderArray(renderArray)
    |> ReduceStateMainService.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (JudgeInstanceMainService.isSourceInstance(uid, state)) {
               FrontRenderLightInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, (geometryIndex, _, _, (_, _, _, getIndicesCountFunc))) =
                 [@bs] FrontRenderLightJobCommon.render(gl, uid, state);
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
         ),
         state
       )
  };

let execJob = (flags, _, state) =>
  _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);

let execJob = (flags, _, state) =>
  _render([@bs] DeviceManagerService.unsafeGetGl(state.deviceManagerRecord), state);