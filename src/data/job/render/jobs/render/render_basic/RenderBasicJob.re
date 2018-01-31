open StateDataType;

let _getBasicMaterialRenderArray = (renderArray, state: StateDataType.state) =>
  renderArray |> Js.Array.filter((uid) => GameObjectAdmin.hasBasicMaterialComponent(uid, state));

let _render = (gl, state: StateDataType.state) =>
  switch (state |> RenderDataSystem.getRenderArrayFromState) {
  | None => state
  | Some(renderArray) =>
    /* TODO move to new render job */
    let state = {
      ...state,
      glslSenderData: {...GLSLSenderSystem.getGLSLSenderData(state), lastSendGeometry: None}
    };
    state
    |> _getBasicMaterialRenderArray(renderArray)
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, uid: int) =>
             if (InstanceUtils.isSourceInstance(uid, state)) {
               RenderBasicInstanceJobCommon.render(gl, uid, state)
             } else {
               let (state, _, geometryIndex) = state |> RenderBasicJobCommon.render(gl, uid);
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

let getJob = (configData, gl, state) => _render(gl, state);