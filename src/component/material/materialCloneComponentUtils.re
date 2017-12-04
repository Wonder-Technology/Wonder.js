open MaterialType;

let handleCloneComponent =
    (sourceComponent: material, countRangeArr: array(int), state: StateDataType.state) => {
  let hasShaderIndex = MaterialShaderIndexUtils.hasShaderIndex(sourceComponent, state);
  let shaderIndex =
    hasShaderIndex ? MaterialShaderIndexUtils.unsafeGetShaderIndex(sourceComponent, state) : -1;
  let createFunc =
    if (MaterialJudgeUtils.isBasicMaterial(sourceComponent, state)) {
      BasicMaterialCreateUtils.create
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
               state |> MaterialShaderIndexUtils.setShaderIndex(sourceComponent, shaderIndex) :
               state
           }
         ),
         state
       );
  (state, componentArr)
};