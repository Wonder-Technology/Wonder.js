/* TODO test */
open MeshRendererType;

let _getData =
  (. sourceComponent, state) =>
    OperateMeshRendererMainService.getDrawMode(sourceComponent, state);

let _setData =
  (. sourceComponent, drawMode, state) =>
    state
    |> OperateMeshRendererMainService.setDrawMode(sourceComponent, drawMode);

let handleCloneComponent = (sourceComponent, countRangeArr, state) => {
  let drawMode = _getData(. sourceComponent, state);

  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. (state, componentArr), _) => {
         let (state, index) = CreateMeshRendererMainService.create(. state);

         let state = _setData(. index, drawMode, state);

         (state, componentArr |> ArrayService.push(index));
       },
       (state, [||]),
     );
};