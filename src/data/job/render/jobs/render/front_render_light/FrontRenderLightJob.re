open StateDataType;

let _getLightMaterialRenderArray = (renderArray, state: StateDataType.state) =>
  renderArray |> Js.Array.filter((uid) => GameObjectAdmin.hasLightMaterialComponent(uid, state));

let _render = (gl, state: StateDataType.state) =>
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    state
    |> _getLightMaterialRenderArray(renderArray)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (InstanceUtils.isSourceInstance(uid, state)) {
               FrontRenderLightInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, geometryIndex) =
                 [@bs] FrontRenderLightJobCommon.render(gl, uid, state);
               GLSLSenderDrawUtils.drawElement(
                 (
                   GeometryAdmin.getDrawMode(gl),
                   GeometryAdmin.getIndexType(gl),
                   GeometryAdmin.getIndexTypeSize(gl),
                   GeometryAdmin.getIndicesCount(geometryIndex, state)
                 ),
                 gl
               );
               state
             }
         ),
         state
       )
  };

let execJob = (configData, gl, state) => _render(gl, state);