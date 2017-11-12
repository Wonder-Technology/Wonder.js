open RenderDataType;

open GameObjectType;

let _getRenderData = (state: StateDataType.state) => state.renderData;

let _getCameraData = (state: StateDataType.state) => Js.Option.getExn(state.renderData.cameraData);

let getCameraVMatrixDataFromState = [@bs] (gameObject: gameObject, state: StateDataType.state) =>
  _getCameraData(state).vMatrix;

let getCameraPMatrixDataFromState = [@bs] (gameObject: gameObject, state: StateDataType.state) =>
  _getCameraData(state).pMatrix;

let getRenderArrayFromState = (state: StateDataType.state) => state.renderData.renderArray;

let setRenderArray = (renderArray, state: StateDataType.state) =>
  _getRenderData(state).renderArray = (
    switch (Js.Array.length(renderArray)) {
    | 0 => None
    | _ => Some(renderArray)
    }
  );

let setCameraData = (cameraData, state: StateDataType.state) =>
  _getRenderData(state).cameraData = cameraData;

let initData = () => {renderArray: None, cameraData: None};