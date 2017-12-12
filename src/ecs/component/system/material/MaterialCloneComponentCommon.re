open MaterialType;

let handleCloneComponent =
    (sourceComponent: material, countRangeArr: array(int), state: StateDataType.state) => {
  let hasShaderIndex = MaterialShaderIndexCommon.hasShaderIndex(sourceComponent, state);
  let shaderIndex =
    hasShaderIndex ? MaterialShaderIndexCommon.unsafeGetShaderIndex(sourceComponent, state) : (-1);
  let createFunc =
    if (MaterialJudgeCommon.isBasicMaterial(sourceComponent, state)) {
      BasicMaterialCreateCommon.create
    } else {
      ExceptionHandleSystem.throwMessage({j|unknown material:$sourceComponent|j})
    };
  let componentArr: array(int) = [||];
  let state =
    countRangeArr
    |> ArraySystem.reduceState(
         [@bs]
         (
           (state, _) => {
             let (state, index) = createFunc(state);
             componentArr |> Js.Array.push(index) |> ignore;
             hasShaderIndex ?
               state |> MaterialShaderIndexCommon.setShaderIndex(sourceComponent, shaderIndex) :
               state
           }
         ),
         state
       );
  (state, componentArr)
};