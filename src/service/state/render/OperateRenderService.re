open RenderType;

open StateDataType;

open GameObjectType;

let _getCameraData = (state) => state.renderRecord.cameraData |> OptionService.unsafeGet;

let getCameraVMatrixData = [@bs] ((state: StateDataType.state) => _getCameraData(state).vMatrix);

let getCameraPMatrixData = [@bs] ((state: StateDataType.state) => _getCameraData(state).pMatrix);

let getCameraPositionData = [@bs] ((state: StateDataType.state) => _getCameraData(state).position);

let getRenderArray = (state: StateDataType.state) => state.renderRecord.renderArray;

let setRenderArray = (renderArray, state: StateDataType.state) => {
  ...state,
  renderRecord: {
    ...state.renderRecord,
    renderArray:
      switch (Js.Array.length(renderArray)) {
      | 0 => None
      | _ => Some(renderArray)
      }
  }
};

let setCameraData = (cameraData, state: StateDataType.state) => {
  ...state,
  renderRecord: {...state.renderRecord, cameraData}
};