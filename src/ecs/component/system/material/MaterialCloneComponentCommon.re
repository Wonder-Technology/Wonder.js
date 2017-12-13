open MaterialType;

let handleCloneComponent =
    (
      sourceComponent: material,
      countRangeArr: array(int),
      isShareMaterial: bool,
      state: StateDataType.state
    ) =>
  isShareMaterial ?
    (state, countRangeArr |> Js.Array.map((_) => sourceComponent)) :
    {
      let hasShaderIndex = MaterialShaderIndexCommon.hasShaderIndex(sourceComponent, state);
      let shaderIndex =
        hasShaderIndex ?
          MaterialShaderIndexCommon.unsafeGetShaderIndex(sourceComponent, state) : (-1);
      let createFunc =
        if (MaterialJudgeCommon.isBasicMaterial(sourceComponent, state)) {
          BasicMaterialCreateCommon.create
        } else {
          ExceptionHandleSystem.throwMessage({j|unknown material:$sourceComponent|j})
        };
      let color = MaterialOperateCommon.unsafeGetColor(sourceComponent, state);
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
                   state
                   |> MaterialOperateCommon.setColor(index, color)
                   |> MaterialShaderIndexCommon.setShaderIndex(index, shaderIndex) :
                   state
               }
             ),
             state
           );
      (state, componentArr)
    };