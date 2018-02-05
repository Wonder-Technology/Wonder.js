open MeshRendererType;

let handleCloneComponent = (countRangeArr: array(int), state: StateDataType.state) =>
  countRangeArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((state, componentArr), _) => {
           let (state, index) = MeshRendererCreateCommon.create(state);
           (state, componentArr |> ArraySystem.push(index))
         }
       ),
       (state, [||])
     );