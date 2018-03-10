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
      (shaderIndexMap, state)
    ) => {
  let hasShaderIndex = MaterialShaderIndexCommon.hasShaderIndex(sourceComponent, shaderIndexMap);
  let shaderIndex =
    hasShaderIndex ?
      MaterialShaderIndexCommon.unsafeGetShaderIndex(sourceComponent, shaderIndexMap) : (-1);
  let dataTuple = [@bs] getDataFunc(sourceComponent, state);
  countRangeArr
  |> WonderCommonlib.ArraySystem.reduceOneParam(
       [@bs]
       (
         ((state, componentArr), _) => {
           let (state, index) = [@bs] createFunc(state);
           let state = [@bs] setDataFunc(index, dataTuple, state);
           let state =
             hasShaderIndex ? [@bs] setShaderIndexFunc(index, shaderIndex, state) : state;
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