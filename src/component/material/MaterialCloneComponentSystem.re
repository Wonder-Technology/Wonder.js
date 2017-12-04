open MaterialType;

let handleCloneComponent =
    (sourceComponent: material, countRangeArr: array(int), state: StateDataType.state) => {
  let hasShaderIndex = MaterialShaderIndexSystem.hasShaderIndex(sourceComponent, state);
  let shaderIndex =
    hasShaderIndex ? MaterialShaderIndexSystem.unsafeGetShaderIndex(sourceComponent, state) : -1;
  let createFunc =
    if (MaterialJudgeSystem.isBasicMaterial(sourceComponent, state)) {
      BasicMaterialCreateSystem.create
    } else {
      ExceptionHandleSystem.throwMessage({j|unknown material:$sourceComponent|j})
    };
  let componentArr = [||];
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = createFunc(state);
             componentArr |> Js.Array.push(index) |> ignore;
             hasShaderIndex ?
               state |> MaterialShaderIndexSystem.setShaderIndex(sourceComponent, shaderIndex) :
               state
           }
         ),
         state
       );
  (state, componentArr)
};