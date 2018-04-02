open MaterialType;

let _handleShareMaterial = (sourceComponent, countRangeArr, (_, state)) => (
  state,
  countRangeArr |> Js.Array.map((_) => sourceComponent)
);

let _handleNotShareMaterial =
    (
      sourceComponent,
      countRangeArr,
      (createFunc, getDataFunc, setDataFunc, setShaderIndexFunc),
      (shaderIndices, state)
    ) => {
  let shaderIndex = ShaderIndicesService.getShaderIndex(sourceComponent, shaderIndices);
  let dataTuple = [@bs] getDataFunc(sourceComponent, state);
  countRangeArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       [@bs]
       (
         ((state, componentArr), _) => {
           let (state, index) = [@bs] createFunc(state);
           let state = [@bs] setDataFunc(index, dataTuple, state);
           let state = [@bs] setShaderIndexFunc(index, shaderIndex, state);
           (state, componentArr |> ArrayService.push(index))
         }
       ),
       (state, [||])
     )
};

let handleCloneComponent =
    ((sourceComponent, countRangeArr: array(int), isShareMaterial: bool), funcTuple, stateTuple) =>
  isShareMaterial ?
    _handleShareMaterial(sourceComponent, countRangeArr, stateTuple) :
    _handleNotShareMaterial(sourceComponent, countRangeArr, funcTuple, stateTuple);