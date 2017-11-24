open MeshRendererType;

let handleCloneComponent =
    (countRangeArr: array(int), state: StateDataType.state) => {
  let componentArr = [||];
  let state = countRangeArr
  |> ArraySystem.reduceState(
       [@bs]
       (
         (state, _) => {
           let (state, index) = MeshRendererCreateUtils.create(state);
           componentArr |> Js.Array.push(index) |> ignore;
           state
         }
       ),
       state
     );
  (state, componentArr)
};