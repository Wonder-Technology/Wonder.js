open MaterialType;

let handleCloneComponent =
    (sourceComponent: material, countRangeArr: array(int), state: StateDataType.state) => {
  let createFunc =
    if (MaterialJudgeUtils.isBasicMaterial(sourceComponent, state)) {
      BasicMaterialCreateUtils.create
    } else {
      ExceptionHandleSystem.throwMessage({j|unknown material:$sourceComponent|j})
    };
  /* todo optimize: add shader index optimize  */
  let componentArr = [||];
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = createFunc(state);
             componentArr |> Js.Array.push(index) |> ignore;
             state
           }
         ),
         state
       );
  (state, componentArr)
};