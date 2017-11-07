open StateDataType;

let getJob = (configData, gl, state) => {
  state.renderData.renderList = Some(MeshRendererSystem.getRenderList(state));
  state
};