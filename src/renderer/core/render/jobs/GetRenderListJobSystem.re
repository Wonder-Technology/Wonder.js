open StateDataType;

let getJob = (configData, gl, state) => {
DebugUtils.log(MeshRendererSystem.getRenderList(state)) |> ignore;
  state.renderData.renderList = Some(MeshRendererSystem.getRenderList(state));
  state
};