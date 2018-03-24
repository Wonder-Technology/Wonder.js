open RenderType;

open MainStateDataType;

open MainStateDataType;

let _getCameraData = (state) => state.renderRecord.cameraData |> OptionService.unsafeGet;

let getCameraVMatrixData = [@bs] ((state: MainStateDataType.state) => _getCameraData(state).vMatrix);

let getCameraPMatrixData = [@bs] ((state: MainStateDataType.state) => _getCameraData(state).pMatrix);

let getCameraPositionData = [@bs] ((state: MainStateDataType.state) => _getCameraData(state).position);

let getRenderArray = (state: MainStateDataType.state) => state.renderRecord.renderArray;

let setRenderArray = (renderArray, state: MainStateDataType.state) => {
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

let setCameraData = (cameraData, state: MainStateDataType.state) => {
  ...state,
  renderRecord: {...state.renderRecord, cameraData}
};