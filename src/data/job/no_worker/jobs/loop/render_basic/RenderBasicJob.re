open StateDataType;

let _getBasicMaterialRenderArray = (renderArray, state: StateDataType.state) =>
  renderArray |> Js.Array.filter((uid) => GameObjectAdmin.hasBasicMaterialComponent(uid, state));

let _render = (gl, state: StateDataType.state) =>
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    state
    |> _getBasicMaterialRenderArray(renderArray)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (InstanceUtils.isSourceInstance(uid, state)) {
               RenderBasicInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, geometryIndex) = [@bs] RenderBasicJobCommon.render(gl, uid, state);
               GLSLSenderDrawUtils.drawElement(
                 (
                   RenderGeometryService.getDrawMode(gl),
                   RenderGeometryService.getIndexType(gl),
                   RenderGeometryService.getIndexTypeSize(gl),
                   IndicesService.getIndicesCount(geometryIndex, state.boxGeometryRecord.indicesMap)
                 ),
                 gl
               );
               state
             }
         ),
         state
       )
  };

let execJob = (flags, _, state) => _render([@bs] DeviceManagerSystem.unsafeGetGl(state), state);
